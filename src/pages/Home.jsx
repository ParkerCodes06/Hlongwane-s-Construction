import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroSlider from "../components/HeroSlider";
import ServiceCard from "../components/ServiceCard";
import ProjectCard from "../components/ProjectCard";
import CTASection from "../components/CTASection";
import Testimonials from "../components/Testimonials";

import { services, projects } from "../data/projects";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6 },
};

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { staggerChildren: 0.12 },
};

const childFade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Home() {
  return (
    <>
      <HeroSlider />

      <motion.section className="section section-light" {...fadeUp}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Our Services</span>
            <h2>Comprehensive Construction Solutions</h2>
            <p>
              Since 2005, Hlongwane&apos;s Construction has been delivering
              high-end construction, electrical, foundation and ceiling
              services across Gauteng and neighbouring provinces.
            </p>
          </div>
          <motion.div className="service-grid" {...stagger}>
            {services.map((s) => (
              <motion.div key={s.slug} {...childFade}>
                <ServiceCard service={s} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="section section-light" {...fadeUp}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Selected Work</span>
            <h2>Signature Projects</h2>
          </div>
          <motion.div className="project-grid" {...stagger}>
            {projects.slice(0, 3).map((p) => (
              <motion.div key={p.id} {...childFade}>
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </motion.div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link to="/portfolio" className="btn-outline-light">
              View All Projects
            </Link>
          </div>
        </div>
      </motion.section>

      <Testimonials />

      <CTASection
        dark
        title="Need a Construction Partner You Can Trust?"
        description="Discuss your project with the Hlongwane's Construction team and get expert guidance on construction, electrical work and building solutions."
        buttonText="Partner with Us"
        buttonLink="/contact"
      />
    </>
  );
}
