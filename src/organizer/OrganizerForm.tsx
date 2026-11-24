import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { googleForm, mapFormFields, prefillForm, useGoogleForm } from '../components/googleForms';
import { reducedMotionQuery, useMediaQuery } from '../components/useMediaQuery';
import { roles } from './content';

const form = googleForm('1FAIpQLSduE7XjfdQ8-dhFlVV5wkyV5YRda7D8SI2xniZ3yvl3pPR4Dg');
const entries = {
  name: 'entry.2118451569',
  email: 'entry.209437452',
  year: 'entry.2123560026',
  hours: 'entry.1567651893',
  roles: 'entry.1313245948',
};
const years = ['Freshman', 'Sophomore', 'Junior', 'Senior'];
const hours = [2, 3, 4, 5, 6];

export function normalizeUsername(value: string) {
  return value
    .trim()
    .replace(/@caltech\.edu$/i, '')
    .toLowerCase();
}

export function buildOrganizerEntries(data: FormData, username: string) {
  const payload = mapFormFields(data, entries);
  payload.set(entries.email, `${username}@caltech.edu`);
  const message = String(data.get('otherRole') ?? '').trim();
  if (message) {
    payload.append(entries.roles, '__other_option__');
    payload.set(`${entries.roles}.other_option_response`, message);
  }
  for (const entry of [entries.year, entries.hours, entries.roles]) payload.set(`${entry}_sentinel`, '');
  return payload;
}

export function OrganizerForm() {
  const { state, submit } = useGoogleForm(form.submit);
  const [fallback, setFallback] = useState(form.respond);
  const formElement = useRef<HTMLFormElement>(null);
  const usernameInput = useRef<HTMLInputElement>(null);
  const status = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useMediaQuery(reducedMotionQuery);

  useEffect(() => {
    if (state === 'error') status.current?.focus();
    if (state === 'sent') {
      status.current?.focus({ preventScroll: true });
      formElement.current?.scrollIntoView({
        block: 'start',
        behavior: reducedMotion ? 'instant' : 'smooth',
      });
    }
  }, [state, reducedMotion]);

  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = usernameInput.current;
    if (!input || state === 'sent') return;
    input.value = normalizeUsername(input.value);
    input.setCustomValidity(
      /^[a-z0-9][a-z0-9._-]*$/.test(input.value) ? '' : 'Enter your Caltech username, such as jzhou3.',
    );
    if (!event.currentTarget.reportValidity()) return;
    const payload = buildOrganizerEntries(new FormData(event.currentTarget), input.value);
    setFallback(prefillForm(form.respond, payload));
    void submit(payload);
  }

  return (
    <form
      id="organizer-form"
      ref={formElement}
      action={form.submit}
      method="post"
      onSubmit={send}
      data-state={state}
      aria-busy={state === 'sending'}
    >
      <div className="form-intro">
        <h2>Application Form</h2>
        <p>
          <span aria-hidden="true">*</span> Required
        </p>
      </div>
      <div className="form-fields" id="organizer-fields" inert={state === 'sent'}>
        <div className="form-fields-inner">
          <div className="field-pair">
            <div className="field">
              <label htmlFor="name">
                Name <span aria-hidden="true">*</span>
              </label>
              <input id="name" name="name" autoComplete="name" required />
            </div>
            <div className="field">
              <label htmlFor="username">
                Caltech username <span aria-hidden="true">*</span>
              </label>
              <div className="email-input">
                <input
                  id="username"
                  name="username"
                  ref={usernameInput}
                  placeholder="jzhou3"
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck={false}
                  aria-describedby="email-suffix"
                  required
                  onChange={(event) => {
                    event.currentTarget.value = normalizeUsername(event.currentTarget.value);
                    event.currentTarget.setCustomValidity('');
                  }}
                />
                <span id="email-suffix">@caltech.edu</span>
              </div>
            </div>
          </div>
          <div className="field">
            <label htmlFor="year">
              Year <span aria-hidden="true">*</span>
            </label>
            <select id="year" name="year" defaultValue="" required>
              <option value="" disabled>
                Select your year
              </option>
              {years.map((year) => (
                <option key={year}>{year}</option>
              ))}
            </select>
          </div>
          <fieldset className="field" aria-describedby="hours-hint">
            <legend>How many hours can you dedicate per week?</legend>
            <p className="hint" id="hours-hint">
              Plan for 2–6 hours a week. Work ramps up closer to the event.
            </p>
            <div className="hours-options">
              {hours.map((time) => (
                <label key={time}>
                  <input type="radio" name="hours" value={time} />
                  {time}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="field">
            <legend>Teams</legend>
            <p className="hint">Choose any you’d like to help with.</p>
            <div className="role-options">
              {roles.map(({ label, value, summary }) => (
                <label key={label}>
                  <input type="checkbox" name="roles" value={value} />
                  {label}
                  <span>{summary}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="field">
            <label htmlFor="otherRole">Questions or anything else?</label>
            <textarea id="otherRole" name="otherRole" rows={3} placeholder="Enter your response here." />
          </div>
          <button className="btn" type="submit" disabled={state === 'sending'}>
            {state === 'sending' ? 'Sending…' : 'Express interest'}
          </button>
          <p className="follow-up">
            Look out for an email from Hacktech within 1–2 weeks with next steps and kickoff meeting
            details.
          </p>
        </div>
      </div>
      <p id="organizer-status" role="status" tabIndex={-1} ref={status} data-kind={state}>
        {state === 'sent' &&
          'Thanks for your interest in helping make Hacktech happen. Your interest has been sent. Look out for an email from Hacktech in your Caltech inbox within 1–2 weeks with next steps and kickoff meeting details.'}
        {state === 'error' &&
          'We couldn’t confirm that your details were sent. Your answers are still here. Open the Google Form below to finish, or try again.'}
      </p>
      <a id="google-fallback" href={fallback} hidden={state !== 'error'}>
        Finish in Google Forms
      </a>
    </form>
  );
}
