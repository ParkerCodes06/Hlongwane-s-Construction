import { useState } from "react";
import { motion } from "framer-motion";
import CTASection from "../../components/CTASection";
import ImageLightbox from "../../components/ImageLightbox";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6 },
};

const electricityImages = [
  "/images/electricity/Gemini_Generated_Image_32i5a932i5a932i5.png",
  "/images/electricity/Gemini_Generated_Image_6sq86o6sq86o6sq8.png",
  "/images/electricity/Gemini_Generated_Image_jj2i3hjj2i3hjj2i.png",
  "/images/electricity/Gemini_Generated_Image_nkvpi9nkvpi9nkvp.png",
];

export default function Electricity() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Services</span>
          <h1>Electricity</h1>
          <p>
            Reliable electrical installations, wiring and maintenance for
            residential and commercial properties across South Africa.
          </p>
        </div>
      </section>

      <motion.section className="section" {...fadeUp}>
        <div className="container-narrow">
          <h2>Electrical Services</h2>
          <p>
            Hlongwane&apos;s Construction provides comprehensive electrical
            services for both residential and commercial properties. Our team
            delivers safe, reliable and code-compliant electrical installations
            for new builds, renovations and maintenance projects.
          </p>
          <p>
            We specialise in complete electrical wiring, power distribution,
            lighting installations, electrical safety inspections and
            compliance certifications. Every project is completed to the
            highest safety standards.
          </p>
          <p>
            Whether you need a full electrical system for a new home,
            three-phase power for a commercial property, or electrical
            upgrades and repairs, our skilled team has the expertise to
            deliver quality results safely and on time.
          </p>
        </div>
      </motion.section>

      <motion.section className="section section-light" {...fadeUp}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Choose Us</span>
            <h2>Our Electrical Standards</h2>
          </div>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Safe &amp; Compliant</h3>
              <p>
                All electrical work complies with South African regulations
                and safety standards for complete peace of mind.
              </p>
            </div>
            <div className="feature-card">
              <h3>Residential &amp; Commercial</h3>
              <p>
                Full electrical services for homes and businesses, from
                basic wiring to three-phase power distribution.
              </p>
            </div>
            <div className="feature-card">
              <h3>Reliable Service</h3>
              <p>
                Skilled electricians delivering quality installations and
                maintenance with a focus on safety and reliability.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="section" {...fadeUp}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Electrical Projects</span>
            <h2>Our Work</h2>
            <p>
              Selected electrical projects showcasing our expertise in
              residential and commercial installations.
            </p>
          </div>
          <div className="gallery-grid">
            {electricityImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Electrical project"
                loading="lazy"
                onClick={() => setLightboxIndex(i)}
              />
            ))}
          </div>
        </div>
      </motion.section>

      <ImageLightbox
        images={electricityImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((i) => (i - 1 + electricityImages.length) % electricityImages.length)}
        onNext={() => setLightboxIndex((i) => (i + 1) % electricityImages.length)}
      />

      <CTASection
        dark
        title="Need Electrical Services?"
        description="Contact our team for reliable electrical installations, maintenance and safety compliance for your home or business."
        buttonText="Start Your Project"
        buttonLink="/contact"
      />
    </>
  );
}
