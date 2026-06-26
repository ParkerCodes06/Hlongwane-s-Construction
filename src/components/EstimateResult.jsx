import { ArrowLeft, ArrowRight, Calculator } from "lucide-react";

export default function EstimateResult({ estimate, serviceLabel, onBack, onContinue }) {
  const pct = Math.round((estimate.min / estimate.max) * 100);

  return (
    <div className="estimate-result">
      <div className="estimate-header">
        <Calculator size={24} style={{ color: "var(--sc-accent)" }} />
        <h3>Estimated Cost Range</h3>
        <p className="estimate-service">{serviceLabel}</p>
      </div>

      <div className="estimate-amount">
        <span className="estimate-min">
          R {estimate.min.toLocaleString("en-ZA")}
        </span>
        <span className="estimate-sep"> – </span>
        <span className="estimate-max">
          R {estimate.max.toLocaleString("en-ZA")}
        </span>
      </div>

      <div className="estimate-bar-track">
        <div
          className="estimate-bar-fill"
          style={{
            width: `${Math.min(pct + 15, 100)}%`,
            background:
              estimate.max < 50000
                ? "var(--sc-accent)"
                : estimate.max < 300000
                  ? "#e6a817"
                  : "#c0392b",
          }}
        />
      </div>

      <div className="estimate-breakdown">
        <h4>Breakdown</h4>
        <ul>
          {estimate.breakdown.map((item, i) => (
            <li key={i}>
              <span>{item.label}</span>
              <span>{item.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="estimate-disclaimer">
        This is a rough estimate based on current Gauteng market averages.
        Final pricing requires a site visit and detailed assessment.
      </p>

      <div className="estimate-actions">
        <button className="btn-ghost" onClick={onBack}>
          <ArrowLeft size={14} /> Adjust Details
        </button>
        <button className="btn-primary" onClick={onContinue}>
          Send This Estimate <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
