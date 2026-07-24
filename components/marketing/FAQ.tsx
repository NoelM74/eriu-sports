const FAQS: { q: string; a: string }[] = [
  {
    q: "What's the minimum order?",
    a: "Ten pieces per product. You can mix sizes and men's and women's fits in the same order.",
  },
  {
    q: "Can I put my own logo on it?",
    a: "Yes. Send us your logo and we print, embroider or sublimate it. You get a free digital mock-up before we make anything.",
  },
  {
    q: "How much does it cost?",
    a: "Your price per piece drops as your order grows. The live price on every product updates as you set your quantity.",
  },
  {
    q: "How long does it take?",
    a: "Most orders ship within 10 to 14 days, once you approve the mock-up.",
  },
  {
    q: "Do you make women's and men's fits?",
    a: "Yes. Most styles come in both, plus unisex cuts. Every product page shows the fit.",
  },
  {
    q: "Can I order samples first?",
    a: "Yes. Order a sample pack to check the fit and fabric before you commit to a full run.",
  },
  {
    q: "What if I need more later?",
    a: "Your kit stays on file. Reorder any time, at the same locked-in price — no new setup.",
  },
  {
    q: "Where do you ship?",
    a: "Worldwide. Designed in Ireland, delivered to your door.",
  },
];

export default function FAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="e-section e-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="e-sec-head" data-reveal>
        <div>
          <p className="e-eyebrow">Questions · Straight answers</p>
          <h2>Good to know.</h2>
        </div>
        <p className="lead">Everything you need before your first order. Still stuck? Talk to us — we answer fast.</p>
      </div>

      <div className="e-faq" data-reveal>
        {FAQS.map((f) => (
          <details className="e-acc" key={f.q}>
            <summary>{f.q}<span className="plus">＋</span></summary>
            <div className="body"><p style={{ margin: 0 }}>{f.a}</p></div>
          </details>
        ))}
      </div>
    </section>
  );
}
