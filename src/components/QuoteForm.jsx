import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function QuoteForm({ config, initialValues, onSubmit, onBack }) {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});

  const handleChange = (key, val) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
  };

  const handleCheckboxGroup = (key, optionVal, checked) => {
    setValues((prev) => {
      const current = prev[key] || [];
      const next = checked
        ? [...current, optionVal]
        : current.filter((v) => v !== optionVal);
      return { ...prev, [key]: next };
    });
  };

  const validate = () => {
    const errs = {};
    for (const field of config.fields) {
      if (!field.required) continue;
      const val = values[field.key];
      if (field.type === "checkbox") continue;
      if (val === undefined || val === null || val === "") {
        errs[field.key] = "This field is required";
      }
      if (field.type === "number" && val !== undefined && val !== "") {
        const n = Number(val);
        if (isNaN(n) || n < field.min || n > field.max) {
          errs[field.key] = `Value must be between ${field.min} and ${field.max}`;
        }
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="quote-form">
      {config.fields.map((field) => (
        <div key={field.key} className="form-group">
          <label htmlFor={`qf-${field.key}`}>{field.label}</label>

          {field.type === "number" && (
            <input
              id={`qf-${field.key}`}
              type="number"
              placeholder={field.placeholder || ""}
              min={field.min}
              max={field.max}
              value={values[field.key] ?? ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
            />
          )}

          {field.type === "select" && (
            <select
              id={`qf-${field.key}`}
              value={values[field.key] ?? ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
            >
              <option value="">-- Select --</option>
              {field.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}

          {field.type === "checkbox" && (
            <div className="checkbox-group">
              {field.options.map((opt) => (
                <label key={opt.value} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={(values[field.key] || []).includes(opt.value)}
                    onChange={(e) =>
                      handleCheckboxGroup(field.key, opt.value, e.target.checked)
                    }
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          )}

          {errors[field.key] && (
            <span className="field-error">{errors[field.key]}</span>
          )}
        </div>
      ))}

      <div className="quote-form-actions">
        <button type="button" className="btn-ghost" onClick={onBack}>
          <ArrowLeft size={14} /> Back
        </button>
        <button type="submit" className="btn-primary">
          Get Estimate
        </button>
      </div>
    </form>
  );
}
