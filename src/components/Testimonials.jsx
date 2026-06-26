import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote:
      "Hlongwane's Construction delivered exceptional quality on our home build. Their attention to detail and professionalism exceeded our expectations at every stage.",
    author: "atisfied Client, Mabopane",
  },
  {
    quote:
      "From foundations to final finishes, the team was reliable, skilled and committed to delivering the best result. We highly recommend their services.",
    author: "Happy Homeowner, Pretoria",
  },
  {
    quote:
      "The electrical work was completed safely and on time. Their team is professional, knowledgeable and a pleasure to work with.",
    author: "Commercial Client, Gauteng",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Testimonials</span>
          <h2>What Our Clients Say</h2>
        </div>
        <div style={{ position: "relative", minHeight: 220 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="testimonial-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="quote-icon">&ldquo;</div>
              <blockquote>{testimonials[current].quote}</blockquote>
              <div className="author">{testimonials[current].author}</div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testimonial-dot${i === current ? " active" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
