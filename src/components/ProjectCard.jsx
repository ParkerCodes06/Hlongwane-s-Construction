import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <Link to="/portfolio">
        <img src={project.image} alt={project.title} loading="lazy" />
        <div className="project-card-overlay">
          <h3>{project.title}</h3>
          <span>{project.description}</span>
        </div>
      </Link>
    </div>
  );
}
