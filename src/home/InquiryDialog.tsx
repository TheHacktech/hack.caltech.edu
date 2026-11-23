import { useState } from 'react';
import type { FormEvent } from 'react';
import { Dialog } from '../components/Dialog';
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
    form: googleForm('1FAIpQLSfAk9FEG4FRKXO4A-rtqRN32fpWcjA8hGjIK3C41A'),
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
  const { form, entries, title, companyLabel, message } = forms[role];
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
      <h2>{title}</h2>
      {role === 'sponsor' ? (
        <div className="bullet-points">
          <ul>
            <li>Introduce your product or platform to 1000+ student developers</li>
            <li>Recruit from an elite pool of software developers and engineers</li>
            <li>Increase your brand's visibility through Hacktech media channels/events</li>
            <li>Facilitate interaction between participants and your employees &amp; brand</li>
          </ul>
          <a href={sponsorPacket} className="footer-link" target="_blank" rel="noopener">
            Click Here for our tentative 2026 Sponsorship Packet!
          </a>
        </div>
      ) : (
        <div className="bullet-points">
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
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            aria-label="Full name"
            autoComplete="name"
            required
          />
          <input
            type="text"
            name="company"
            placeholder={companyLabel}
            aria-label={companyLabel}
            autoComplete="organization"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email address"
            autoComplete="email"
            required
          />
          <textarea name="inquiry" placeholder={message} aria-label={message} required />
          <button type="submit" className="submit-btn" disabled={state === 'sending'}>
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
    <Dialog
      id="application-modal"
      className="inquiry-dialog"
      open={open}
      onClose={close}
      label="Sponsor or judge inquiry"
    >
      <div className="modal-content">
        <button type="button" className="close" aria-label="Close inquiry" onClick={close}>
          ×
        </button>
        {role ? (
          <InquiryForm role={role} onBack={() => setRole(null)} />
        ) : (
          <>
            <h2>Select your role below:</h2>
            <div className="role-buttons">
              <button type="button" onClick={() => setRole('sponsor')} className="btn">
                Sponsor
              </button>
              <button type="button" onClick={() => setRole('judge')} className="btn">
                Judge
              </button>
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
}
