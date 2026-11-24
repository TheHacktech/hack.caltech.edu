import { useState } from 'react';
import type { FormEvent } from 'react';
import { HomeDialog } from './HomeDialog';
import { googleForm, mapFormFields, prefillForm, useGoogleForm } from '../components/googleForms';
import { sponsorPacket } from './content';

const forms = {
  sponsor: {
    form: googleForm('1FAIpQLScaXKKqWv3xH95D01U6Kcp6-kWObQMms3LS3NSfGSl_Ohop3A'),
    entries: {
      name: 'entry.1972753818',
      company: 'entry.298471248',
      email: 'entry.1403727519',
      inquiry: 'entry.1550975964',
    },
    title: 'Sponsor Hacktech for our 2026 iteration!',
    companyLabel: 'Company/Organization Name',
    message: 'Inquiry',
  },
  judge: {
    form: googleForm('1FAIpQLSfAk9FEG4FRKXO4A-rtqRN32xl9ZSW32fpWcjA8hGjIK3C41A'),
    entries: {
      name: 'entry.1393572412',
      company: 'entry.1417270478',
      email: 'entry.695580584',
      inquiry: 'entry.1475204026',
    },
    title: 'Apply to be a Judge for Hacktech!',
    companyLabel: 'Company Name and Role',
    message: 'Have you judged at any other hackathon previously? If so, please specify which one.',
  },
};

type Role = keyof typeof forms;

function InquiryForm({ role, onBack }: { role: Role; onBack: () => void }) {
  const { form, entries, companyLabel, message } = forms[role];
  const { state, submit } = useGoogleForm(form.submit);
  const [fallback, setFallback] = useState(form.respond);

  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = mapFormFields(new FormData(event.currentTarget), entries);
    setFallback(prefillForm(form.respond, data));
    void submit(data);
  }

  return (
    <>
      <button className="inquiry-back" type="button" onClick={onBack}>
        ← Choose a different role
      </button>
      <div className="inquiry-layout">
        {role === 'sponsor' ? (
          <div className="inquiry-details">
            <ul>
              <li>Introduce your product or platform to 1000+ student developers</li>
              <li>Recruit from an elite pool of software developers and engineers</li>
              <li>Increase your brand's visibility through Hacktech media channels/events</li>
              <li>Facilitate interaction between participants and your employees &amp; brand</li>
            </ul>
            <a href={sponsorPacket} className="packet-link" target="_blank" rel="noopener">
              Click Here for our tentative 2026 Sponsorship Packet!
            </a>
          </div>
        ) : (
          <div className="inquiry-details">
            <p>
              For our 2026 iteration, we are looking for judges who are passionate about technology,
              innovation and helping aspiring students. Note that spots are limited, and priority will be
              given to standout individuals, or sponsor company judges. If you are a sponsor looking to
              send judges, please review/fill out the sponsor form.
            </p>
            <p>
              Interested in learning more or chatting about Hacktech? Connect with one of our Directors -
              we'd love to hear from you!
            </p>
          </div>
        )}
        {state === 'sent' ? (
          <p role="status">Your inquiry has been sent. Thanks for your interest!</p>
        ) : (
          <form onSubmit={send} aria-busy={state === 'sending'}>
            <label>
              Full Name
              <input type="text" name="name" aria-label="Full name" autoComplete="name" required />
            </label>
            <label>
              {companyLabel}
              <input type="text" name="company" aria-label={companyLabel} autoComplete="organization" required />
            </label>
            <label>
              Email
              <input type="email" name="email" aria-label="Email address" autoComplete="email" required />
            </label>
            <label>
              {message}
              <textarea name="inquiry" aria-label={message} required />
            </label>
            <button type="submit" className="btn action-button" disabled={state === 'sending'}>
              {state === 'sending' ? 'Sending…' : 'Submit'}
            </button>
            {state === 'error' && (
              <p role="status">
                We couldn’t confirm that your inquiry was sent.{' '}
                <a href={fallback} target="_blank" rel="noopener">
                  Finish in Google Forms ↗
                </a>
              </p>
            )}
          </form>
        )}
      </div>
    </>
  );
}

export function InquiryDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [role, setRole] = useState<Role | null>(null);

  function close() {
    onClose();
    setRole(null);
  }

  return (
    <HomeDialog
      id="application-modal"
      open={open}
      onClose={close}
      closeLabel="Close inquiry"
      title={role ? forms[role].title : 'Select your role below:'}
      view={role ?? 'choose'}
    >
      {role ? (
        <InquiryForm role={role} onBack={() => setRole(null)} />
      ) : (
        <div className="inquiry-choices">
          <button type="button" onClick={() => setRole('sponsor')} className="btn action-button">
            Sponsor
          </button>
          <button type="button" onClick={() => setRole('judge')} className="btn action-button">
            Judge
          </button>
        </div>
      )}
    </HomeDialog>
  );
}
