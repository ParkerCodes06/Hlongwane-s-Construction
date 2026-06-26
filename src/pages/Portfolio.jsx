import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CTASection from "../components/CTASection";
import PortfolioFilter from "../components/PortfolioFilter";
import ImageLightbox from "../components/ImageLightbox";
import { projects } from "../data/projects";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6 },
};

const childFade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.4 },
};

const categoryMap = {
  1: "Buildings", 2: "Buildings", 3: "Buildings", 4: "Buildings", 5: "Buildings",
  6: "Electricity", 7: "Electricity", 10: "Electricity", 12: "Electricity", 13: "Electricity",
  8: "Foundations", 9: "Foundations", 11: "Foundations",
  14: "Carports", 15: "Carports", 16: "Carports", 17: "Carports",
  18: "Ceilings", 19: "Ceilings", 20: "Ceilings", 21: "Ceilings", 22: "Ceilings", 23: "Ceilings",
};

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => categoryMap[p.id] === filter);
  }, [filter]);

  const allImages = useMemo(() => filtered.map((p) => p.image), [filtered]);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Portfolio</span>
          <h1>Our Projects</h1>
        </div>
      </section>

      <motion.section className="section" {...fadeUp}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Selected Work</span>
            <h2>Featured Projects</h2>
            <p>
              A selection of Hlongwane&apos;s Construction projects across
              residential and commercial properties, showcasing our
              construction, electrical, foundation and building capabilities.
            </p>
          </div>

          <PortfolioFilter active={filter} onSelect={setFilter} />

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              className="project-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.map((p, i) => (
                <motion.div key={p.id} {...childFade}>
                  <div
                    className="project-card"
                    onClick={() => setLightboxIndex(i)}
                  >
                    <img src={p.image} alt={p.title} loading="lazy" />
                    <div className="project-card-overlay">
                      <h3>{p.title}</h3>
                      <span>{p.description}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.section>

      <ImageLightbox
        images={allImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() =>
          setLightboxIndex((i) => (i - 1 + allImages.length) % allImages.length)
        }
        onNext={() =>
          setLightboxIndex((i) => (i + 1) % allImages.length)
        }
      />

      <CTASection
        dark
        title="Ready to Start Your Project?"
        description="Whether you're planning a new build, renovation or electrical work, our team is here to guide you through every step."
        buttonText="Get in Touch"
        buttonLink="/contact"
      />
    </>
  );
}
