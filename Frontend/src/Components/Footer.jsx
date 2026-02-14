import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();
  const [visible, setVisible] = useState(false);

  // Show button after scrolling 300px
  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="w-full bg-gradient-to-t from-black via-zinc-900 to-zinc-800 text-white border-t border-purple-900 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-purple-400 tracking-wide">UNMUTE</span>
          <span className="text-sm text-zinc-400">© {year}</span>
        </div>

        {/* Center: Navigation */}
        <nav className="flex gap-8 text-sm font-medium -translate-x-15">
          <Link to="/about" className="text-zinc-300 hover:text-purple-400 hover:scale-105 transition">
            About
          </Link>
          <Link to="/features" className="text-zinc-300 hover:text-purple-400 hover:scale-105 transition">
            Features
          </Link>
          <Link to="/contact" className="text-zinc-300 hover:text-purple-400 hover:scale-105 transition">
            Contact
          </Link>
        </nav>
      </div>

      {/* Optional: Bottom Divider or Glow */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-purple-700 to-transparent opacity-40"></div>

      {/* Back to Top Button */}
      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-purple-700 hover:bg-purple-600 text-white shadow-lg transition-all duration-300 animate-bounce cursor-pointer"
          aria-label="Back to top"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;
