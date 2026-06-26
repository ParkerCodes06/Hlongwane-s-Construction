import { motion } from "framer-motion";
import { Shield, Award, TrendingUp, Users, CheckCircle } from "lucide-react";
import CTASection from "../components/CTASection";
import SectionDivider from "../components/SectionDivider";
import { pillars } from "../data/projects";

const pillarIcons = [Shield, Award, TrendingUp, Users, CheckCircle];

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
  transition: { staggerChildren: 0.1 },
};

const childFade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">About Hlongwane&apos;s Construction</span>
          <h1>The Story Behind Our Craft</h1>
        </div>
      </section>

      <motion.section className="section" {...fadeUp}>
        <div className="container-narrow">
          <h2>
            Reliable Residential Construction Across Gauteng &amp; Neighbouring
            Provinces
          </h2>
          <p>
            At Hlongwane&apos;s Construction Company PTY LTD, we work closely
            with each client to understand their needs, lifestyle and long-term
            vision for their home. Our detail-oriented approach ensures dependable
            outcomes and beautifully crafted, durable living environments.
          </p>
          <p>
            Whether it&apos;s a new build, major renovation, electrical
            installation, foundation work or a full turnkey project, our
            focus remains the same: clear communication, careful planning and a
            well-managed building experience from start to finish.
          </p>
          <p>
            We aim to build long-term relationships by delivering work that feels
            carefully considered, well executed and aligned with what our clients
            envisioned.
          </p>
        </div>
      </motion.section>

      <SectionDivider fill="#f8f7f4" />

      <motion.section className="section section-light" {...fadeUp}>
        <div className="container-narrow">
          <span className="eyebrow">Our Approach</span>
          <h2>A Seamless, Design-Led Construction Experience</h2>
          <p>
            At Hlongwane&apos;s Construction, every project begins with a deep
            understanding of our client&apos;s vision, lifestyle and long-term
            goals. We focus on clear communication, meticulous planning and a
            personalised process that ensures every decision supports the
            architectural intent of the home.
          </p>
          <p>
            Our integrated approach allows us to collaborate closely with
            specialists, resulting in homes that are functional, timeless and
            beautifully executed. From concept to completion, we deliver a
            construction experience that is structured, transparent and
            professionally managed.
          </p>
        </div>
      </motion.section>

      <SectionDivider fill="#ffffff" />

      <motion.section className="section" {...fadeUp}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Our Pillars</span>
            <h2>The Principles That Guide Our Work</h2>
            <p>
              Our work is driven by five core pillars that shape how we plan,
              build and manage every project.
            </p>
          </div>
          <motion.div className="pillars-grid" {...stagger}>
            {pillars.map((p, i) => {
              const Icon = pillarIcons[i];
              return (
                <motion.div key={p.title} className="pillar-card" {...childFade}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: "var(--sc-accent-light)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 16px"
                  }}>
                    <Icon size={22} style={{ color: "var(--sc-accent)" }} />
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      <CTASection
        dark
        title="Let's Bring Your Vision to Life"
        description="Whether you're planning a new home, a major upgrade or a full turnkey project, our team is ready to assist with expert guidance."
        buttonText="Start Your Project"
        buttonLink="/contact"
      />
    </>
  );
}
