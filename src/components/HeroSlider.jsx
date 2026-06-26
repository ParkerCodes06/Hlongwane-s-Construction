import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { sliderSlides } from "../data/projects";

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % sliderSlides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + sliderSlides.length) % sliderSlides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section
      className="hero-slider-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        marginTop: 70,
        position: "relative",
        height: "90vh",
        minHeight: 550,
        maxHeight: 850,
        overflow: "hidden",
      }}
    >
      <style>{`
        .slide {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .slide-bg {
          position: absolute; inset: -20px;
          background-size: cover; background-position: center;
          transition: transform 8s ease-out;
        }
        .slide.active .slide-bg {
          transform: scale(1.08);
        }
        .slide::after {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%);
        }
        .slide-content {
          position: relative; z-index: 2;
          text-align: center; color: #fff;
          max-width: 760px; padding: 0 24px;
        }
        .slide-content .eyebrow { color: rgba(255,255,255,0.6); }
        .slide-content h1 {
          color: #fff; margin-bottom: 20px;
          font-size: clamp(2.2rem, 5vw, 3.5rem);
        }
        .slide-content p {
          color: rgba(255,255,255,0.8); margin-bottom: 36px;
          font-size: 1.05rem; max-width: 560px; margin-left: auto; margin-right: auto;
        }
        .slider-nav {
          position: absolute; bottom: 40px; left: 50%;
          transform: translateX(-50%); display: flex; gap: 12px; z-index: 3;
        }
        .slider-dot {
          width: 32px; height: 3px; border: none;
          background: rgba(255,255,255,0.3);
          cursor: pointer; transition: all 0.4s ease;
          border-radius: 2px; position: relative;
        }
        .slider-dot::after {
          content: ""; position: absolute;
          top: -12px; left: -6px;
          right: -6px; bottom: -12px;
        }
        .slider-dot.active {
          background: var(--sc-accent); width: 48px;
        }
        .slider-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          z-index: 3; background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff; width: 52px; height: 52px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s ease;
          border-radius: 50%;
          backdrop-filter: blur(4px);
        }
        .slider-arrow:hover {
          background: rgba(255,255,255,0.2);
          border-color: rgba(255,255,255,0.3);
        }
        .slider-arrow.prev { left: 24px; }
        .slider-arrow.next { right: 24px; }
        @media (max-width: 768px) {
          .hero-slider-section { height: 65vh; min-height: 400px; }
          .slider-arrow { width: 40px; height: 40px; }
          .slider-arrow.prev { left: 8px; }
          .slider-arrow.next { right: 8px; }
          .slide-content h1 { font-size: 2rem; }
        }
      `}</style>

      <AnimatePresence mode="wait">
        {sliderSlides.map((slide, i) =>
          i === current ? (
            <motion.div
              key={i}
              className="slide active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <div
                className="slide-bg"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="slide-content">
                <motion.span
                  className="eyebrow"
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                >
                  {slide.label}
                </motion.span>
                <motion.h1
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                >
                  {slide.description}
                </motion.p>
                <motion.div
                  custom={3}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                >
                  <Link to={slide.link} className="btn-outline">
                    Start Your Project
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      <div className="slider-nav">
        {sliderSlides.map((_, i) => (
          <button
            key={i}
            className={`slider-dot${i === current ? " active" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <button className="slider-arrow prev" onClick={prev} aria-label="Previous">
        <ChevronLeft size={22} />
      </button>
      <button className="slider-arrow next" onClick={next} aria-label="Next">
        <ChevronRight size={22} />
      </button>
    </section>
  );
}
