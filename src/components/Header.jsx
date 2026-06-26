import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `nav-link${isActive ? " current" : ""}`;

  return (
    <header
      className="site-header"
      style={{
        background: scrolled
          ? "rgba(255,255,255,0.92)"
          : "rgba(255,255,255,0.97)",
        boxShadow: scrolled
          ? "0 4px 30px rgba(0,0,0,0.06)"
          : "none",
        backdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      <style>{`
        .site-header {
          position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;
          border-bottom: 1px solid rgba(0,0,0,0.04);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .header-inner {
          display: flex; align-items: center; justify-content: space-between;
          height: 70px;
        }
        .logo-text {
          font-family: var(--font-heading);
          font-size: 17px; font-weight: 600; color: #111;
          letter-spacing: 0.3px; line-height: 1.2;
        }
        .nav-list { display: flex; align-items: center; gap: 0; }
        .nav-list > li { position: relative; }
        .nav-link {
          display: flex; align-items: center; gap: 4px;
          padding: 10px 18px; font-size: 12px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 1px;
          color: #111; transition: color 0.3s ease;
          position: relative;
        }
        .nav-link::after {
          content: ""; position: absolute; bottom: 4px; left: 18px; right: 18px;
          height: 2px; background: var(--sc-accent);
          transform: scaleX(0); transition: transform 0.3s ease;
        }
        .nav-link:hover, .nav-link.current { color: var(--sc-accent); }
        .nav-link:hover::after, .nav-link.current::after { transform: scaleX(1); }
        .sub-menu {
          position: absolute; top: 100%; left: 0;
          background: #fff; border: 1px solid rgba(0,0,0,0.06);
          min-width: 220px; padding: 8px 0;
          opacity: 0; visibility: hidden;
          transform: translateY(8px);
          transition: all 0.25s ease;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08); z-index: 999;
        }
        .nav-list > li:hover .sub-menu {
          opacity: 1; visibility: visible; transform: translateY(0);
        }
        .sub-menu a {
          display: block; padding: 10px 20px; font-size: 12px;
          color: #333; transition: all 0.2s ease;
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        .sub-menu a:hover {
          background: var(--sc-accent-light); color: var(--sc-accent);
          padding-left: 24px;
        }
        .menu-toggle {
          display: none; background: none; border: none;
          cursor: pointer; padding: 10px; color: #111;
          transition: transform 0.3s ease;
        }
        .menu-toggle.open { transform: rotate(90deg); }
        .mobile-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.5);
          z-index: 998; opacity: 0; visibility: hidden;
          transition: all 0.3s ease; backdrop-filter: blur(4px);
        }
        .mobile-overlay.open { opacity: 1; visibility: visible; }
      `}</style>

      <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />

      <div className="container header-inner">
        <Link to="/" className="logo-text">
          Hlongwane&apos;s Construction
        </Link>
        <button
          className={`menu-toggle${mobileOpen ? " open" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav className={`main-nav${mobileOpen ? " open" : ""}`}>
          <ul className="nav-list">
            <li>
              <NavLink to="/" className={linkClass} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={linkClass}>
                About Us
              </NavLink>
            </li>
            <li className={`menu-item-has-children${servicesOpen ? " open" : ""}`}>
              <span
                className="nav-link"
                style={{ cursor: "pointer" }}
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services <ChevronDown size={10} />
              </span>
              <ul className="sub-menu">
                <li><Link to="/services/buildings">Buildings</Link></li>
                <li><Link to="/services/foundations">Foundations</Link></li>
                <li><Link to="/services/electricity">Electricity</Link></li>
                <li><Link to="/services/carports">Carports</Link></li>
                <li><Link to="/services/ceilings">Ceilings</Link></li>
              </ul>
            </li>
            <li>
              <NavLink to="/portfolio" className={linkClass}>
                Portfolio
              </NavLink>
            </li>
            <li>
              <NavLink to="/quote" className={linkClass}>
                Get a Quote
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={linkClass}>
                Contact Us
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
