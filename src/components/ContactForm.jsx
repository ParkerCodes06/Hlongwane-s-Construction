import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    comments: "",
    file: null,
  });
  const [fileName, setFileName] = useState("Drag and Drop (or) Choose Files");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, file }));
    setFileName(file ? file.name : "Drag and Drop (or) Choose Files");
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "60px 24px" }}>
        <CheckCircle size={56} style={{ color: "var(--sc-accent)", marginBottom: 20 }} />
        <h3 style={{ marginBottom: 12, fontFamily: "var(--font-heading)" }}>
          Thank You!
        </h3>
        <p style={{ color: "var(--sc-text-body)", fontSize: "0.95rem" }}>
          Your message has been received. We&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name">Name and Surname *</label>
        <input
          type="text" id="name" name="name"
          value={form.name} onChange={handleChange}
          style={errors.name ? { borderColor: "#e74c3c" } : {}}
        />
        {errors.name && (
          <span style={{ color: "#e74c3c", fontSize: 12, marginTop: 4, display: "block" }}>
            {errors.name}
          </span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="phone">Contact Number *</label>
        <input
          type="tel" id="phone" name="phone"
          value={form.phone} onChange={handleChange}
          style={errors.phone ? { borderColor: "#e74c3c" } : {}}
        />
        {errors.phone && (
          <span style={{ color: "#e74c3c", fontSize: 12, marginTop: 4, display: "block" }}>
            {errors.phone}
          </span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email Address *</label>
        <input
          type="email" id="email" name="email"
          value={form.email} onChange={handleChange}
          style={errors.email ? { borderColor: "#e74c3c" } : {}}
        />
        {errors.email && (
          <span style={{ color: "#e74c3c", fontSize: 12, marginTop: 4, display: "block" }}>
            {errors.email}
          </span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <select id="subject" name="subject" value={form.subject} onChange={handleChange}>
          <option value="">--Select--</option>
          <option value="buildings">Buildings</option>
          <option value="foundations">Foundations</option>
          <option value="electricity">Electricity</option>
          <option value="carports">Carports</option>
          <option value="ceilings">Ceilings</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="file-upload">Attach Drawings or Plans (Optional)</label>
        <div className="file-upload" onClick={() => document.getElementById("file-upload").click()}>
          <p>{fileName}</p>
          <input type="file" id="file-upload" name="file" onChange={handleFile} style={{ display: "none" }} />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="comments">Comments</label>
        <textarea id="comments" name="comments" maxLength={180} value={form.comments} onChange={handleChange} />
        <div className="char-count">{180 - form.comments.length} / 180</div>
      </div>
      <button
        type="submit"
        className="submit-btn"
        style={{ display: "inline-flex", alignItems: "center", gap: 10 }}
      >
        <Send size={14} /> Submit Enquiry
      </button>
    </form>
  );
}
