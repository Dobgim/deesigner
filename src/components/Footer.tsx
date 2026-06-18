import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand & About */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg shadow-md">
              <span className="text-white font-extrabold text-xl">MC</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black text-lg tracking-tight leading-none">
                Moduler<span className="text-primary">Container</span>Hub
              </span>
              <span className="text-[10px] text-slate-400 font-semibold tracking-widest mt-0.5 uppercase">
                Build Faster. Deploy Smarter.
              </span>
            </div>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed mt-2">
            Drawing upon years of industry knowledge and expertise, we are committed to delivering top-quality products at competitive prices. We deliver quality you can see and experience you can trust.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="https://facebook.com" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
            </a>
            <a href="https://instagram.com" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300" aria-label="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
            <a href="https://linkedin.com" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-base relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-primary">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <Link to="/" className="hover:text-primary transition-colors duration-200">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary transition-colors duration-200">Who We Are</Link>
            </li>
            <li>
              <Link to="/about#values" className="hover:text-primary transition-colors duration-200">Our Values</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-primary transition-colors duration-200">Our Services</Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-primary transition-colors duration-200">Products Catalog</Link>
            </li>
          </ul>
        </div>

        {/* Product Categories */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-base relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-primary">
            Product Categories
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <Link to="/products?category=Portable Container Homes" className="hover:text-primary transition-colors">Portable Container Homes</Link>
            </li>
            <li>
              <Link to="/products?category=Office Cabin" className="hover:text-primary transition-colors">Office Cabin</Link>
            </li>
            <li>
              <Link to="/products?category=Sanitation & Toilet Containers" className="hover:text-primary transition-colors">Sanitation & Toilet Containers</Link>
            </li>
            <li>
              <Link to="/products?category=Storage Containers" className="hover:text-primary transition-colors">Storage Containers</Link>
            </li>
            <li>
              <Link to="/products?category=Used Containers" className="hover:text-primary transition-colors">Used Containers</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-base relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-primary">
            Contact Details
          </h4>
          <ul className="flex flex-col gap-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
              <span>1310 Esplanade, Redondo Beach, CA 90277</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-primary flex-shrink-0" />
              <a href="https://wa.me/17156068445" className="hover:text-primary transition-colors">+1 (715) 606-8445</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-primary flex-shrink-0" />
              <a href="mailto:info@modulercontainerhub.com" className="hover:text-primary transition-colors">info@modulercontainerhub.com</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="bg-secondary-dark text-slate-500 text-xs py-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <span>&copy; {new Date().getFullYear()} ModulerContainerHub. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/about#privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/about#payment" className="hover:text-primary transition-colors">Payment Terms</Link>
            <Link to="/about#shipping" className="hover:text-primary transition-colors">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
