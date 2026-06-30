import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Menu, X, ChevronDown } from 'lucide-react';
import logo from '../assets/logo.png';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'about' | 'products' | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleDropdown = (name: 'about' | 'products') => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative py-2 text-sm font-medium transition-colors duration-300 hover:text-primary ${
      isActive ? 'text-primary' : 'text-slate-700'
    }`;

  return (
    <>
      {/* Top Bar Info - Hidden when scrolled */}
      <div className={`bg-secondary text-slate-300 text-xs py-2 transition-all duration-300 ${isScrolled ? 'h-0 py-0 overflow-hidden' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6">
            <a href="https://wa.me/17156068445" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Phone size={14} className="text-primary" />
              <span>+1 (715) 606-8445</span>
            </a>
            <a href="mailto:info@modulercontainerhub.com" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Mail size={14} className="text-primary" />
              <span>info@modulercontainerhub.com</span>
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-center sm:text-right">
            <MapPin size={14} className="text-primary" />
            <span>1310 Esplanade, Redondo Beach, CA 90277</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100`}>
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src={logo} 
              alt="Moduler Container Hub" 
              className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="flex flex-col">
              <span className="text-secondary font-black text-lg sm:text-xl tracking-tight leading-none">
                Moduler<span className="text-primary">Container</span>Hub
              </span>
              <span className="text-[10px] text-slate-500 font-semibold tracking-widest mt-0.5 uppercase">
                Build Faster. Deploy Smarter.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>

            {/* About Dropdown */}
            <div className="relative group">
              <button
                onClick={() => toggleDropdown('about')}
                onMouseEnter={() => setActiveDropdown('about')}
                className={`flex items-center gap-1 py-2 text-sm font-medium transition-colors duration-300 hover:text-primary ${
                  location.pathname.startsWith('/about') ? 'text-primary' : 'text-slate-700'
                }`}
              >
                <span>About Us</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
              </button>

              <div
                onMouseLeave={() => setActiveDropdown(null)}
                className={`absolute top-full left-0 w-56 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 py-2 transition-all duration-300 transform origin-top-left ${
                  activeDropdown === 'about' ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'
                }`}
              >
                <Link to="/about" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors">
                  Who We Are
                </Link>
                <Link to="/about#values" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors">
                  Our Values
                </Link>
                <Link to="/about#privacy" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </div>
            </div>

            {/* Products Dropdown */}
            <div className="relative group">
              <button
                onClick={() => toggleDropdown('products')}
                onMouseEnter={() => setActiveDropdown('products')}
                className={`flex items-center gap-1 py-2 text-sm font-medium transition-colors duration-300 hover:text-primary ${
                  location.pathname.startsWith('/products') ? 'text-primary' : 'text-slate-700'
                }`}
              >
                <span>Products</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
              </button>

              <div
                onMouseLeave={() => setActiveDropdown(null)}
                className={`absolute top-full left-0 w-72 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 py-2 transition-all duration-300 transform origin-top-left ${
                  activeDropdown === 'products' ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'
                }`}
              >
                <Link to="/products?category=Portable Container Homes" className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors">
                  <span className="font-semibold block">Portable Container Homes</span>
                  <span className="text-[11px] text-slate-500">Premium modular turnkey houses</span>
                </Link>
                <Link to="/products?category=Office Cabin" className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors">
                  <span className="font-semibold block">Office Cabin</span>
                  <span className="text-[11px] text-slate-500">Relocatable office cabins & kiosks</span>
                </Link>
                <Link to="/products?category=Sanitation & Toilet Containers" className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors">
                  <span className="font-semibold block">Sanitation & Toilet Blocks</span>
                  <span className="text-[11px] text-slate-500">Anti-vandal portable site toilets</span>
                </Link>
                <Link to="/products?category=Storage Containers" className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors">
                  <span className="font-semibold block">Storage Containers</span>
                  <span className="text-[11px] text-slate-500">10ft, 20ft & 40ft storage solutions</span>
                </Link>
                <Link to="/products?category=Used Containers" className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors">
                  <span className="font-semibold block">Used Containers</span>
                  <span className="text-[11px] text-slate-500">Cost-effective pre-owned containers</span>
                </Link>
              </div>
            </div>

            <NavLink to="/services" className={navLinkClass}>Services</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact Us</NavLink>
          </nav>

          {/* Quote Button (Desktop) */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/quote"
              className="btn-shine bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Get a Quote
            </Link>
          </div>

          {/* Hamburger Menu Icon (Mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-primary transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`lg:hidden fixed inset-x-0 top-20 bg-white border-b border-slate-100 shadow-xl transition-all duration-300 ease-in-out transform origin-top ${
            isMobileMenuOpen ? 'opacity-100 scale-y-100 h-[calc(100vh-80px)] overflow-y-auto' : 'opacity-0 scale-y-0 h-0 overflow-hidden'
          }`}
        >
          <div className="px-6 py-6 flex flex-col gap-6">
            <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-slate-800 border-b border-slate-50 pb-2">
              Home
            </NavLink>

            {/* Mobile About */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => toggleDropdown('about')}
                className="flex items-center justify-between text-lg font-semibold text-slate-800 border-b border-slate-50 pb-2"
              >
                <span>About Us</span>
                <ChevronDown size={18} className={`transition-transform duration-300 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'about' && (
                <div className="pl-4 py-2 flex flex-col gap-3 border-l-2 border-primary/20">
                  <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-primary font-medium text-sm">
                    Who We Are
                  </Link>
                  <Link to="/about#values" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-primary font-medium text-sm">
                    Our Values
                  </Link>
                  <Link to="/about#privacy" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-primary font-medium text-sm">
                    Privacy Policy
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Products */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => toggleDropdown('products')}
                className="flex items-center justify-between text-lg font-semibold text-slate-800 border-b border-slate-50 pb-2"
              >
                <span>Products</span>
                <ChevronDown size={18} className={`transition-transform duration-300 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'products' && (
                <div className="pl-4 py-2 flex flex-col gap-3 border-l-2 border-primary/20">
                  <Link to="/products?category=Portable Container Homes" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-primary font-medium text-sm">
                    Portable Container Homes
                  </Link>
                  <Link to="/products?category=Office Cabin" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-primary font-medium text-sm">
                    Office Cabin
                  </Link>
                  <Link to="/products?category=Sanitation & Toilet Containers" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-primary font-medium text-sm">
                    Sanitation & Toilet Containers
                  </Link>
                  <Link to="/products?category=Storage Containers" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-primary font-medium text-sm">
                    Storage Containers
                  </Link>
                  <Link to="/products?category=Used Containers" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-primary font-medium text-sm">
                    Used Containers
                  </Link>
                </div>
              )}
            </div>

            <NavLink to="/services" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-slate-800 border-b border-slate-50 pb-2">
              Services
            </NavLink>

            <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-slate-800 border-b border-slate-50 pb-2">
              Contact Us
            </NavLink>

            <Link
              to="/quote"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-primary hover:bg-primary-dark text-white text-center font-bold py-3 rounded-lg shadow-md hover:shadow-lg mt-4 transition-all"
            >
              Get a Quote
            </Link>

            {/* Quick Mobile Contact Details */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-4 text-slate-600 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <span>+1 (715) 606-8445</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <span>info@modulercontainerhub.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <span>1310 Esplanade, Redondo Beach, CA 90277</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
