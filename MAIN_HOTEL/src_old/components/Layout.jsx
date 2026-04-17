import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Footer from "./Footer";
import AssistantBot from "./Assistant/AssistantBot";

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); 

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      <header className="header">
        {/* Left */}
        <Link to="/" className="logo-container" style={{textDecoration: 'none'}}>
            <span className="logo-icon">n.</span>
            <span className="logo-text">NOOK</span>
        </Link>

        {/* Center - Desktop */}
        <nav className="nav-center desktop-only">
          <Link to="/stays">Stays</Link>
          <a href="#">Collections</a>
          <a href="#">Our Story</a>
        </nav>

        {/* Right - Desktop */}
        <div className="nav-right desktop-only">
          <a href="#" className="login-link">Sign In</a>
          <a href="#" className="book-btn">Book a Stay</a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
          <nav className="mobile-nav">
            <Link to="/stays">Stays</Link>
            <a href="#">Collections</a>
            <a href="#">Our Story</a>
            <hr style={{width: '100%', borderColor: 'rgba(0,0,0,0.05)', margin: '10px 0'}} />
            <a href="#">Sign In</a>
            <a href="#" className="book-btn-mobile">Book a Stay</a>
          </nav>
        </div>
      </header>
      
      <main className="main">
        <Outlet />
      </main>

      <AssistantBot />
      <Footer />
    </>
  );
}
