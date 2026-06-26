import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";
import WhatsAppButton from "../components/WhatsAppButton";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6 },
};

export default function Contact() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Contact Us</span>
          <h1>Let&apos;s Talk About Your Next Project</h1>
        </div>
      </section>

      <motion.section className="section" {...fadeUp}>
        <div className="container contact-grid">
          <div className="contact-info">
            <span className="eyebrow">Get in Touch</span>
            <h2>
              Reliable Contact Information for Hlongwane&apos;s Construction
            </h2>

            <h3>Contact Details</h3>
            <p>
              <a href="tel:0661186094">066 118 6094</a>
            </p>
            <p>
              <a href="mailto:info@hlongwanesconstruction.co.za">
                info@hlongwanesconstruction.co.za
              </a>
            </p>

            <h3>Physical Address</h3>
            <p>
              Mabopane<br />
              South Africa
            </p>

            <h3>Follow Us</h3>
            <p>
              <a href="https://facebook.com/Hlongwanesconstruction" target="_blank" rel="noopener noreferrer">
                Facebook: Hlongwane&apos;s Construction
              </a>
            </p>

            <h3>WhatsApp Us</h3>
            <p>
              <a href="https://wa.me/27661186094" target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </p>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </motion.section>

      <WhatsAppButton />
    </>
  );
}
