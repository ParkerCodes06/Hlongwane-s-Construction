import { useState } from "react";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";

export default function LeadCapture({ estimate, serviceLabel, onBack, onSubmit }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    onSubmit({
      ...form,
      estimate,
      service: serviceLabel,
    });
  };

  if (submitted) {
    return (
      <div className="lead-success">
        <CheckCircle size={56} style={{ color: "var(--sc-accent)", marginBottom: 20 }} />
        <h3>Estimate Sent!</h3>
        <p>
          Thank you! We&apos;ve received your estimate request.
          A member of our team will contact you within 1–2 business days.
        </p>
        <p className="lead-success-ref">
          Reference: <strong>{serviceLabel}</strong> — R{" "}
          {estimate.min.toLocaleString("en-ZA")} – R{" "}
          {estimate.max.toLocaleString("en-ZA")}
        </p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate>
      <h3>Receive Your Estimate</h3>
      <p>
        Enter your details and we&apos;ll send this estimate to your inbox.
      </p>

      <div className="form-group">
        <label htmlFor="lead-name">Name and Surname *</label>
        <input
          type="text"
          id="lead-name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="lead-phone">Contact Number *</label>
        <input
          type="tel"
          id="lead-phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        {errors.phone && <span className="field-error">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="lead-email">Email Address *</label>
        <input
          type="email"
          id="lead-email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="lead-message">Message (optional)</label>
        <textarea
          id="lead-message"
          name="message"
          rows={3}
          value={form.message}
          onChange={handleChange}
        />
      </div>

      <div className="lead-form-actions">
        <button type="button" className="btn-ghost" onClick={onBack}>
          <ArrowLeft size={14} /> Back
        </button>
        <button type="submit" className="btn-primary">
          <Send size={14} /> Send Estimate
        </button>
      </div>
    </form>
  );
}
