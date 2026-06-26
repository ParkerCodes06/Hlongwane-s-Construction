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

const ceilingImages = [
  "/images/ceiling/Gemini_Generated_Image_l0smq2l0smq2l0sm.png",
  "/images/ceiling/Gemini_Generated_Image_lbj782lbj782lbj7.png",
  "/images/ceiling/Gemini_Generated_Image_qopcvlqopcvlqopc.png",
  "/images/ceiling/Gemini_Generated_Image_rklc2urklc2urklc.png",
];

export default function Ceilings() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Services</span>
          <h1>Ceilings</h1>
          <p>
            Professional ceiling installation, finishing and repairs for
            beautiful, long-lasting interiors in homes and commercial spaces.
          </p>
        </div>
      </section>

      <motion.section className="section" {...fadeUp}>
        <div className="container-narrow">
          <h2>Ceiling Services</h2>
          <p>
            Hlongwane&apos;s Construction provides professional ceiling
            installation, finishing and repair services for residential and
            commercial properties. Our team delivers quality ceilings that
            enhance the look and feel of any interior space.
          </p>
          <p>
            We specialise in suspended ceilings, ceiling boards, plaster
            ceilings and custom ceiling designs. Every installation is
            completed with precision and attention to detail for a flawless
            finish.
          </p>
          <p>
            Whether you need a new ceiling for a home renovation, a suspended
            ceiling for a commercial office, or repairs to an existing ceiling,
            our skilled team has the expertise to deliver quality results.
          </p>
        </div>
      </motion.section>

      <motion.section className="section section-light" {...fadeUp}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Choose Us</span>
            <h2>Our Ceiling Standards</h2>
          </div>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Quality Finishing</h3>
              <p>
                Precision installation and flawless finishing for ceilings
                that look great and last for years.
              </p>
            </div>
            <div className="feature-card">
              <h3>Residential &amp; Commercial</h3>
              <p>
                Ceiling solutions for homes, offices and commercial spaces
                with a variety of styles and materials.
              </p>
            </div>
            <div className="feature-card">
              <h3>Professional Service</h3>
              <p>
                Experienced team delivering reliable ceiling installations
                with a focus on quality and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="section" {...fadeUp}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Ceiling Projects</span>
            <h2>Our Work</h2>
            <p>
              Selected ceiling installations showcasing our craftsmanship
              and attention to detail.
            </p>
          </div>
          <div className="gallery-grid">
            {ceilingImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Ceiling project"
                loading="lazy"
                onClick={() => setLightboxIndex(i)}
              />
            ))}
          </div>
        </div>
      </motion.section>

      <ImageLightbox
        images={ceilingImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((i) => (i - 1 + ceilingImages.length) % ceilingImages.length)}
        onNext={() => setLightboxIndex((i) => (i + 1) % ceilingImages.length)}
      />

      <CTASection
        dark
        title="Need Ceiling Installation or Repairs?"
        description="Contact our team for professional ceiling services for your home or commercial property."
        buttonText="Start Your Project"
        buttonLink="/contact"
      />
    </>
  );
}
