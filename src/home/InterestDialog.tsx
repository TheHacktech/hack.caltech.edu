import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Dialog } from '../components/Dialog';
import { googleForm, mapFormFields, prefillForm, useGoogleForm } from '../components/googleForms';

const form = googleForm('1FAIpQLScd0m1kB2O3BEX79iQ3hSpfhrPdpFlDCK_v5WfoPdeliGb54Q');
const fields = [
  { name: 'name', label: 'Name', entry: 'entry.993923362', autoComplete: 'name', maxLength: 200 },
  {
    name: 'school',
    label: 'School / university',
    entry: 'entry.1506888359',
    autoComplete: 'organization',
    maxLength: 200,
  },
  { name: 'email', label: 'Email', entry: 'entry.1847982766', autoComplete: 'email', maxLength: 254 },
];

interface InterestDialogProps {
  open: boolean;
  onClose: () => void;
}

export function InterestDialog({ open, onClose }: InterestDialogProps) {
  const { state, submit } = useGoogleForm(form.submit);
  const [fallback, setFallback] = useState(form.respond);
  const status = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (open && (state === 'sent' || state === 'error')) status.current?.focus();
  }, [open, state]);

  function sendInterest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const element = event.currentTarget;
    for (const input of element.querySelectorAll('input')) input.value = input.value.trim();
    if (!element.reportValidity() || state === 'sent') return;
    const entries = mapFormFields(
      new FormData(element),
      Object.fromEntries(fields.map(({ name, entry }) => [name, entry])),
    );
    setFallback(prefillForm(form.respond, entries));
    void submit(entries);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      id="hacker-interest"
      labelledBy="hacker-interest-title"
      describedBy="hacker-interest-description"
    >
      <div className="hacker-interest-content">
        <button
          className="hacker-interest-close"
          type="button"
          aria-label="Close hacker interest form"
          onClick={onClose}
        >
          ×
        </button>
        <header className="hacker-interest-intro">
          <h2 id="hacker-interest-title">
            Hacktech <span>interest form</span>
          </h2>
          <p id="hacker-interest-description">
            Applications aren’t open yet. Submit your name, school, and email below, and we’ll notify you
            as soon as full applications open.
          </p>
        </header>
        <form
          id="hacker-interest-form"
          action={form.submit}
          method="post"
          aria-busy={state === 'sending'}
          onSubmit={sendInterest}
        >
          <div id="hacker-interest-fields" hidden={state === 'sent'}>
            {fields.map(({ name, label, autoComplete, maxLength }) => (
              <div className="hacker-interest-field" key={name}>
                <label htmlFor={`hacker-${name}`}>
                  {label} <span aria-hidden="true">*</span>
                </label>
                <input
                  id={`hacker-${name}`}
                  name={name}
                  type={name === 'email' ? 'email' : 'text'}
                  autoComplete={autoComplete}
                  maxLength={maxLength}
                  required
                  readOnly={state === 'sending'}
                />
              </div>
            ))}
            <button type="submit" className="btn" disabled={state === 'sending'}>
              {state === 'sending' ? 'Sending…' : 'Register interest'}
            </button>
          </div>
          <div id="hacker-interest-sent" hidden={state !== 'sent'}>
            <span className="hacker-interest-check" aria-hidden="true">
              ✓
            </span>
            <h3>Thanks for your interest!</h3>
            <p>We’ll email you as soon as full applications open.</p>
            <button type="button" className="btn" onClick={onClose}>
              Done
            </button>
          </div>
          <p id="hacker-interest-status" role="status" tabIndex={-1} ref={status} data-kind={state}>
            {state === 'sent' && 'Your details have been sent.'}
            {state === 'error' &&
              'We couldn’t confirm your details were sent. Your answers are still here. Try again or finish in Google Forms below.'}
          </p>
          <a
            id="hacker-interest-fallback"
            href={fallback}
            target="_blank"
            rel="noopener"
            hidden={state !== 'error'}
          >
            Finish in Google Forms ↗
          </a>
        </form>
        {open && (
          <figure className="hacker-interest-film">
            <iframe
              className="hacker-interest-video"
              title="Hacktech video"
              src="https://www.youtube.com/embed/34aiQcVEcUo?rel=0&playsinline=1"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </figure>
        )}
      </div>
    </Dialog>
  );
}
