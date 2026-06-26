import * as Icons from "lucide-react";
import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  const IconComp = Icons[service.icon];

  return (
    <Link
      to={`/services/${service.slug}`}
      className="service-card"
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <div className="service-icon" style={{ marginBottom: 20, display: "flex", justifyContent: "center" }}>
        {IconComp ? <IconComp size={42} /> : null}
      </div>
      <span className="service-label">{service.label}</span>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <span className="btn-outline-light">Learn More</span>
    </Link>
  );
}
