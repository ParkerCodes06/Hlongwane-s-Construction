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

const carportImages = [
  "/images/carports/Gemini_Generated_Image_9ucfz49ucfz49ucf.png",
  "/images/carports/Gemini_Generated_Image_buij3dbuij3dbuij.png",
  "/images/carports/Gemini_Generated_Image_nshbl0nshbl0nshb.png",
  "/images/carports/Gemini_Generated_Image_q07hupq07hupq07h.png",
];

export default function Carports() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Services</span>
          <h1>Carports</h1>
          <p>
            Quality carport structures built to protect your vehicles with
            durable materials and modern designs.
          </p>
        </div>
      </section>

      <motion.section className="section" {...fadeUp}>
        <div className="container-narrow">
          <h2>Carport Services</h2>
          <p>
            Hlongwane&apos;s Construction specialises in building strong,
            stylish and durable carport structures for residential properties.
            Our carports are designed to protect your vehicles from the elements
            while enhancing the look of your property.
          </p>
          <p>
            We use quality materials and proven construction techniques to
            deliver carports that are built to last. Whether you need a
            single-car carport, a double-carport, or a custom design, our
            team can create a solution that fits your property perfectly.
          </p>
          <p>
            Each carport is designed with both function and aesthetics in mind,
            providing reliable protection for your vehicles while complementing
            the architectural style of your home.
          </p>
        </div>
      </motion.section>

      <motion.section className="section section-light" {...fadeUp}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Choose Us</span>
            <h2>Our Carport Standards</h2>
          </div>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Durable Construction</h3>
              <p>
                Built with quality materials to withstand the elements and
                provide long-lasting protection for your vehicles.
              </p>
            </div>
            <div className="feature-card">
              <h3>Custom Designs</h3>
              <p>
                Tailored carport solutions that match your property and meet
                your specific parking needs.
              </p>
            </div>
            <div className="feature-card">
              <h3>Professional Installation</h3>
              <p>
                Skilled team ensuring proper installation and a finished
                product that looks great and performs reliably.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="section" {...fadeUp}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Carport Projects</span>
            <h2>Our Work</h2>
            <p>
              Selected carport installations showcasing our craftsmanship
              and attention to detail.
            </p>
          </div>
          <div className="gallery-grid">
            {carportImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Carport project"
                loading="lazy"
                onClick={() => setLightboxIndex(i)}
              />
            ))}
          </div>
        </div>
      </motion.section>

      <ImageLightbox
        images={carportImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((i) => (i - 1 + carportImages.length) % carportImages.length)}
        onNext={() => setLightboxIndex((i) => (i + 1) % carportImages.length)}
      />

      <CTASection
        dark
        title="Need a Carport for Your Property?"
        description="Get in touch with our team to discuss your carport requirements and get a quality structure built to protect your vehicles."
        buttonText="Start Your Project"
        buttonLink="/contact"
      />
    </>
  );
}
