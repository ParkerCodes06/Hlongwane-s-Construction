export default function SectionDivider({ fill = "#f8f7f4", flip = false }) {
  return (
    <div
      className="section-divider"
      style={{ transform: flip ? "rotate(180deg)" : "none" }}
    >
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
        <path
          d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
