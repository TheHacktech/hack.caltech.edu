import { faq } from './content';

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
            <details className="faq-item" key={question}>
              <summary className="faq-question">
                {question}
                <span className="faq-toggle-icon" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="faq-answer">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
