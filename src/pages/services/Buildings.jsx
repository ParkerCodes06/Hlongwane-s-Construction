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

const buildingImages = [
  "/images/buildings/Gemini_Generated_Image_dbzhbodbzhbodbzh.png",
  "/images/buildings/Gemini_Generated_Image_flwu61flwu61flwu.png",
  "/images/buildings/Gemini_Generated_Image_qhlronqhlronqhlr.png",
  "/images/buildings/Gemini_Generated_Image_v4z7aav4z7aav4z7.png",
];

export default function Buildings() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Services</span>
          <h1>Buildings</h1>
          <p>
            High-end residential and commercial building construction in modern estates and
            suburbs across South Africa.
          </p>
        </div>
      </section>

      <motion.section className="section" {...fadeUp}>
        <div className="container-narrow">
          <h2>Building Services</h2>
          <p>
            We are a company committed to high quality and top standards,
            providing world-class services to our clients. We specialize in
            constructing modern and high-end homes in various esteemed estates
            and suburbs throughout South Africa.
          </p>
          <p>
            Our affiliations include membership in the NHBRC, CIDB, and the
            Master Builders Association. Our goal is to deliver the quality
            construction solutions and services that our customers rightfully
            expect.
          </p>
          <p>
            We maintain an unwavering commitment to quality, and our skilled
            craftsmanship is of the utmost standard. Our dedication lies in
            ensuring customer satisfaction and delivering the best services while
            adhering to contractual obligations and achieving optimal service
            delivery for all our projects.
          </p>
        </div>
      </motion.section>

      <motion.section className="section section-light" {...fadeUp}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Choose Us</span>
            <h2>Our Building Standards</h2>
          </div>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>High-End Residential Focus</h3>
              <p>
                Specialising in modern, high-end homes in esteemed estates and
                suburbs throughout South Africa.
              </p>
            </div>
            <div className="feature-card">
              <h3>Quality &amp; Craftsmanship</h3>
              <p>
                Committed to top standards, skilled craftsmanship and delivering
                the level of quality clients expect.
              </p>
            </div>
            <div className="feature-card">
              <h3>Registered &amp; Compliant</h3>
              <p>
                Registered with NHBRC, CIDB and the Master Builders Association
                for complete peace of mind.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="section" {...fadeUp}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Building Projects</span>
            <h2>Our Work</h2>
            <p>
              Selected construction projects showcasing our workmanship,
              attention to detail and commitment to quality.
            </p>
          </div>
          <div className="gallery-grid">
            {buildingImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Building project"
                loading="lazy"
                onClick={() => setLightboxIndex(i)}
              />
            ))}
          </div>
        </div>
      </motion.section>

      <ImageLightbox
        images={buildingImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((i) => (i - 1 + buildingImages.length) % buildingImages.length)}
        onNext={() => setLightboxIndex((i) => (i + 1) % buildingImages.length)}
      />

      <CTASection
        dark
        title="Ready to Discuss Your Building Project?"
        description="Share your ideas, budget and requirements with us. We'll help you plan and execute a high-quality building project tailored to your vision."
        buttonText="Start Your Project"
        buttonLink="/contact"
      />
    </>
  );
}
