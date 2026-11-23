import { useId, useState } from 'react';
import { faq } from './content';

function FaqItem({ question, answer }: (typeof faq)[number]) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="faq-item">
      <button type="button" className="faq-question" aria-expanded={open} aria-controls={id}
        onClick={() => setOpen(!open)}>
        {question}
        <span className="faq-toggle-icon" aria-hidden="true">+</span>
      </button>
      <div className="faq-reveal" id={id} inert={!open}>
        <div><p className="faq-answer">{answer}</p></div>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <h2 className="h2 section-title" id="faq-title">
          General FAQ
        </h2>
        <p className="section-text">
          If you can't find your answer here, feel free to contact us via our email or social media! FAQ
          last updated March 14th, 2025.
        </p>
        <div className="faq-list">
          {faq.map(({ question, answer }) => (
            <FaqItem key={question} question={question} answer={answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
