import { Link } from "react-router-dom";

export default function CTASection({ dark, title, description, buttonText, buttonLink }) {
  return (
    <section className={`cta-section${dark ? " section-dark" : ""}`}>
      <style>{`
        .cta-section { text-align: center; padding: 80px 0; }
        .cta-section h2 { margin-bottom: 12px; }
        .cta-section p { max-width: 560px; margin: 0 auto 28px; }
      `}</style>
      <div className="container">
        <h2>{title}</h2>
        <p>{description}</p>
        <Link to={buttonLink} className={dark ? "btn-outline" : "btn-outline-light"}>
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
