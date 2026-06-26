export default function SectionHeader({ eyebrow, title, description, light }) {
  return (
    <div className="section-header">
      {eyebrow && <span className="section-label">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <style>{`
        .section-header { text-align: center; margin-bottom: 48px; }
        .section-header h2 { margin-bottom: 12px; }
        .section-header p { max-width: 640px; margin: 0 auto; }
      `}</style>
    </div>
  );
}
