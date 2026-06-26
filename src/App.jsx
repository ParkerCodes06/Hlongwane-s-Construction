import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";
import Preloader from "./components/Preloader";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Buildings from "./pages/services/Buildings";
import Foundations from "./pages/services/Foundations";
import Electricity from "./pages/services/Electricity";
import Carports from "./pages/services/Carports";
import Ceilings from "./pages/services/Ceilings";
import Quote from "./pages/Quote";

function ScrollRestore() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/buildings" element={<Buildings />} />
          <Route path="/services/foundations" element={<Foundations />} />
          <Route path="/services/electricity" element={<Electricity />} />
          <Route path="/services/carports" element={<Carports />} />
          <Route path="/services/ceilings" element={<Ceilings />} />
          <Route path="/quote" element={<Quote />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Preloader />
      <ScrollProgress />
      <ScrollRestore />
      <Header />
      <AnimatedRoutes />
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </BrowserRouter>
  );
}
