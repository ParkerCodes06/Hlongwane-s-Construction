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

const foundationImages = [
  "/images/foundations/Gemini_Generated_Image_83f5u083f5u083f5.png",
  "/images/foundations/Gemini_Generated_Image_fj0p0lfj0p0lfj0p.png",
  "/images/foundations/Gemini_Generated_Image_p140nup140nup140.png",
];

export default function Foundations() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Services</span>
          <h1>Foundations</h1>
          <p>
            Strong, durable foundations built to last. We deliver the best
            foundation solutions for homes and commercial properties across
            South Africa.
          </p>
        </div>
      </section>

      <motion.section className="section" {...fadeUp}>
        <div className="container-narrow">
          <h2>Foundation Services</h2>
          <p>
            At Hlongwane&apos;s Construction, we understand that a quality
            foundation is the most critical part of any building project. Our
            foundation solutions are engineered for strength, stability and
            long-term durability, ensuring your structure stands the test of
            time.
          </p>
          <p>
            We specialise in strip foundations, reinforced concrete foundations,
            deep foundations and ground preparation for both residential and
            commercial projects. Every foundation we build is designed to
            meet the specific soil conditions and structural requirements of
            your site.
          </p>
          <p>
            Our team uses quality materials and proven techniques to deliver
            foundations that provide the best possible support for your home
            or commercial building. We take pride in building foundations
            that our clients can trust completely.
          </p>
        </div>
      </motion.section>

      <motion.section className="section section-light" {...fadeUp}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Choose Us</span>
            <h2>Our Foundation Standards</h2>
          </div>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Strong &amp; Durable</h3>
              <p>
                Foundations engineered for maximum strength and stability,
                using quality materials and proven construction methods.
              </p>
            </div>
            <div className="feature-card">
              <h3>Site-Specific Solutions</h3>
              <p>
                Every foundation is designed to suit the unique soil
                conditions and structural requirements of your site.
              </p>
            </div>
            <div className="feature-card">
              <h3>Expert Craftsmanship</h3>
              <p>
                Skilled team with years of experience delivering reliable
                foundation solutions for homes and commercial buildings.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="section" {...fadeUp}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Foundation Projects</span>
            <h2>Our Work</h2>
            <p>
              Selected foundation projects showcasing our commitment to
              quality, strength and precision.
            </p>
          </div>
          <div className="gallery-grid">
            {foundationImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Foundation project"
                loading="lazy"
                onClick={() => setLightboxIndex(i)}
              />
            ))}
          </div>
        </div>
      </motion.section>

      <ImageLightbox
        images={foundationImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((i) => (i - 1 + foundationImages.length) % foundationImages.length)}
        onNext={() => setLightboxIndex((i) => (i + 1) % foundationImages.length)}
      />

      <CTASection
        dark
        title="Need Strong Foundations for Your Project?"
        description="Discuss your foundation requirements with our team and get expert guidance on the best solution for your home or commercial building."
        buttonText="Start Your Project"
        buttonLink="/contact"
      />
    </>
  );
}
