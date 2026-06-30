import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Wrench, ShieldCheck, Truck, RotateCcw,
  Star, Container, Landmark, FileCheck, ShieldAlert, Quote as QuoteIcon,
  Users, Package, Award, ChevronDown
} from 'lucide-react';
import { PRODUCTS_DATA } from '../lib/products-data';
import { animateFadeIn, animateStaggeredFadeIn } from '../lib/gsap-config';
import CountUp from '../components/CountUp';

/* ─────────────────────── DATA ─────────────────────── */

const reviews = [
  {
    id: 1,
    name: 'Marcus T.',
    role: 'Site Operations Manager',
    company: 'BuildCore Solutions',
    avatar: 'MT',
    rating: 5,
    text: 'Absolutely outstanding quality. The 40ft office cabin arrived fully fitted — electrical panels live, insulation perfect, anti-vandal locks solid. We were operational within 48 hours of delivery. ModulerContainerHub completely exceeded expectations.'
  },
  {
    id: 2,
    name: 'Sarah L.',
    role: 'Procurement Director',
    company: 'AgriMax Farms',
    avatar: 'SL',
    rating: 5,
    text: 'We needed portable toilet blocks for a large outdoor festival. Ordering was seamless, delivery was on time, and the units were spotless and regulation compliant. We will definitely be ordering again next season.'
  },
  {
    id: 3,
    name: 'James O.',
    role: 'Project Engineer',
    company: 'Delta Constructions',
    avatar: 'JO',
    rating: 5,
    text: 'The buy-back program is a massive differentiator. We purchased 6 security cabins for a 12-month road project. Once the project ended, they bought them back at a fair valuation. Zero hassle, great ROI.'
  },
  {
    id: 4,
    name: 'Priya M.',
    role: 'Logistics Coordinator',
    company: 'Nexus Freight Ltd',
    avatar: 'PM',
    rating: 5,
    text: 'International shipping was handled flawlessly. They managed all customs documentation and coordinated the drop-off on our remote site. Communication throughout was professional and responsive. Highly recommend.'
  },
  {
    id: 5,
    name: 'Carlos R.',
    role: 'CEO',
    company: 'R-Prime Estates',
    avatar: 'CR',
    rating: 5,
    text: 'We converted three containers into beautiful modular display homes for a property expo. The interior finishing, wall paneling, and glass frontage were executed exactly to our CAD drawings. Stunning results.'
  },
  {
    id: 6,
    name: 'Aisha N.',
    role: 'Facilities Manager',
    company: 'GreenField Events',
    avatar: 'AN',
    rating: 5,
    text: 'Competitive pricing, genuine product quality, and a team that actually listens to your requirements. The 20ft storage containers we ordered were reinforced, lockboxes fitted, and delivered ahead of schedule. 10/10.'
  }
];

const homeServices = [
  {
    id: 1,
    title: 'Supply of New & Used Containers',
    icon: <Container className="w-7 h-7" />,
    desc: 'Standard 20ft and 40ft new or pre-owned shipping containers inspected to highest standards.',
    color: 'bg-emerald-50 text-emerald-700'
  },
  {
    id: 2,
    title: 'Worldwide Shipping & Delivery',
    icon: <Truck className="w-7 h-7" />,
    desc: 'Global logistics network with full customs clearance and coordinated site drop-off.',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    id: 3,
    title: 'Customized Container Solutions',
    icon: <Wrench className="w-7 h-7" />,
    desc: 'Reefer systems, windows, double-doors, shelving, and full HVAC grid installation.',
    color: 'bg-orange-50 text-orange-700'
  },
  {
    id: 4,
    title: 'Rental & Leasing Options',
    icon: <Landmark className="w-7 h-7" />,
    desc: 'Flexible monthly rental agreements with zero upfront capital investment required.',
    color: 'bg-violet-50 text-violet-700'
  },
  {
    id: 5,
    title: 'Container Buy-Back Program',
    icon: <RotateCcw className="w-7 h-7" />,
    desc: 'Fair valuation buy-back when your project wraps — recover capital with ease.',
    color: 'bg-yellow-50 text-yellow-700'
  },
  {
    id: 6,
    title: 'Conversion Containers',
    icon: <ShieldAlert className="w-7 h-7" />,
    desc: 'Acoustic insulation, wall partitions, restrooms, and anti-vandal security fittings.',
    color: 'bg-rose-50 text-rose-700'
  },
  {
    id: 7,
    title: 'Turnkey Modular Units',
    icon: <FileCheck className="w-7 h-7" />,
    desc: 'Fully pre-installed plumbing, heating & cooling, certified electrical boards — plug and play.',
    color: 'bg-teal-50 text-teal-700'
  }
];

const stats = [
  { end: 500, suffix: '+', label: 'Units Delivered', icon: <Package className="w-6 h-6" /> },
  { end: 40, suffix: '+', label: 'Countries Served', icon: <Truck className="w-6 h-6" /> },
  { end: 12, suffix: '+', label: 'Years Experience', icon: <Award className="w-6 h-6" /> },
  { end: 98, suffix: '%', label: 'Client Satisfaction', icon: <Users className="w-6 h-6" /> }
];

/* ─────────────────────── STAR COMPONENT ─────────────────────── */
const StarRow = ({ count = 5 }: { count?: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < count ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
      />
    ))}
  </div>
);

/* ─────────────────────── PAGE ─────────────────────── */
const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroRef     = useRef<HTMLDivElement>(null);
  const introRef    = useRef<HTMLDivElement>(null);
  const turnkeyRef  = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const aboutRef    = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const reviewsRef  = useRef<HTMLDivElement>(null);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&crop=center&q=85&w=1600',
      title: 'High-Quality Modular Containers for Every Need',
      sub: 'Storage Units • Portable Toilets • Security Cabins • Container Homes'
    },
    {
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&crop=center&q=85&w=1600',
      title: 'Build Faster. Deploy Smarter.',
      sub: 'Turnkey Modular Units Prepared for Immediate Site Operation'
    }
  ];

  useEffect(() => {
    const id = setInterval(() => setCurrentSlide(p => (p + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  useEffect(() => {
    if (heroRef.current) animateFadeIn(heroRef.current, 'none', 0.1, 1.2);

    if (introRef.current) {
      const children = introRef.current.querySelectorAll('.animate-item');
      animateStaggeredFadeIn(Array.from(children) as HTMLElement[], 'up', 0.15);
    }

    if (turnkeyRef.current) {
      const title = turnkeyRef.current.querySelector('.animate-title');
      const cards = turnkeyRef.current.querySelectorAll('.animate-card');
      if (title) animateFadeIn(title as HTMLElement, 'up', 0.1);
      if (cards.length) animateStaggeredFadeIn(Array.from(cards) as HTMLElement[], 'up', 0.15);
    }

    if (productsRef.current) {
      const title = productsRef.current.querySelector('.animate-title');
      const grid  = productsRef.current.querySelectorAll('.product-card');
      if (title) animateFadeIn(title as HTMLElement, 'up', 0.1);
      if (grid.length) animateStaggeredFadeIn(Array.from(grid) as HTMLElement[], 'up', 0.1);
    }

    if (aboutRef.current) {
      const items = aboutRef.current.querySelectorAll('.animate-item');
      animateStaggeredFadeIn(Array.from(items) as HTMLElement[], 'up', 0.12);
    }

    if (servicesRef.current) {
      const title = servicesRef.current.querySelector('.animate-title');
      const cards = servicesRef.current.querySelectorAll('.svc-card');
      if (title) animateFadeIn(title as HTMLElement, 'up', 0.1);
      if (cards.length) animateStaggeredFadeIn(Array.from(cards) as HTMLElement[], 'up', 0.1);
    }

    if (reviewsRef.current) {
      const title = reviewsRef.current.querySelector('.animate-title');
      const cards = reviewsRef.current.querySelectorAll('.review-card');
      if (title) animateFadeIn(title as HTMLElement, 'up', 0.1);
      if (cards.length) animateStaggeredFadeIn(Array.from(cards) as HTMLElement[], 'up', 0.1);
    }
  }, []);

  const featuredProducts = PRODUCTS_DATA.slice(0, 3);

  return (
    <div className="flex flex-col w-full">

      {/* ══════════════════ HERO ══════════════════ */}
      <section ref={heroRef} className="relative h-[85vh] sm:h-[80vh] w-full overflow-hidden bg-slate-950">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-dark/90 via-secondary/70 to-transparent z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transform: idx === currentSlide ? 'scale(1)' : 'scale(1.05)', transition: 'transform 6s ease' }}
            />
            <div className="relative z-20 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-start">
              <div className="max-w-2xl text-left flex flex-col gap-6">
                <span className="inline-block bg-primary text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full tracking-wider uppercase shadow-md animate-pulse">
                  Premium Modular Builds
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-lg sm:text-xl text-slate-200 font-medium tracking-wide leading-relaxed">
                  {slide.sub}
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <Link to="/quote" className="btn-shine bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3.5 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
                    <span>Get a Quote</span>
                    <ArrowRight size={18} />
                  </Link>
                  <Link to="/products" className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-xl border border-white/25 hover:border-white/40 shadow-md backdrop-blur-sm transition-all duration-300">
                    View Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-3 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'bg-primary w-8' : 'bg-white/50 hover:bg-white w-3'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Scroll-down cue */}
        <div className="absolute bottom-7 right-8 z-30 hidden sm:flex flex-col items-center gap-1 text-white/70">
          <span className="text-[10px] font-semibold tracking-widest uppercase">Scroll</span>
          <ChevronDown size={20} className="animate-bob" />
        </div>
      </section>

      {/* ══════════════════ INTRO / ABOUT (existing) ══════════════════ */}
      <section ref={introRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6 text-left animate-item">
            <span className="text-primary font-bold text-sm tracking-widest uppercase">
              ABOUT MODULERCONTAINERHUB
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary leading-tight tracking-tight">
              Buy Modular Structures Online At ModulerContainerHub
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Drawing upon years of industry knowledge and expertise, we are committed to delivering top quality products at competitive prices. In addition to modular containers and shipping containers, we have expanded our range to include flat pack storage containers, portable offices, and toilet blocks.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Monthly rental costs can eat into your budget. Purchasing a modular structure is a more cost-efficient alternative. Plus, there is no minimum rental period, and you are not limited by contractual obligations. Deploy smarter. Reduce overhead. Own your infrastructure.
            </p>
            <div>
              <Link to="/about" className="text-primary hover:text-primary-dark font-bold inline-flex items-center gap-1 group transition-colors">
                <span>Read More About Our Standard Quality</span>
                <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 relative animate-item">
            <div className="absolute inset-0 bg-primary/10 rounded-3xl transform rotate-3" />
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
              alt="Modular container facility"
              className="relative rounded-3xl shadow-xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════ TURNKEY FEATURES (existing) ══════════════════ */}
      <section ref={turnkeyRef} className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto flex flex-col gap-4 mb-16 animate-title">
            <span className="text-primary font-bold text-sm tracking-widest uppercase">WHAT ARE TURNKEY CONTAINERS?</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
              Ready-to-Use Modular Units. Built to Deploy Fast.
            </h2>
            <p className="text-slate-500">
              Unlike basic shipping containers or empty shells, turnkey containers are designed, built, equipped, and completed before delivery.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <ShieldCheck size={24} />, title: 'Reinforced Steel Structure', desc: 'Heavy-gauge construction and corrosion-resistant exterior coatings provide high load capacities and weather resistance.' },
              { icon: <Wrench size={24} />, title: 'Ready-to-Use Fittings', desc: 'Pre-installed electrical wiring, insulation, and interior partitions/fittings allow operation immediately after connection.' },
              { icon: <Truck size={24} />, title: 'Rapid Global Delivery', desc: 'Delivered globally using our reliable logistics network, ensuring compliance with local transport regulations.' },
              { icon: <RotateCcw size={24} />, title: 'Buy-Back Program', desc: 'When your container project is completed, we offer a fair and hassle-free buy-back program to help recover capital.' }
            ].map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-left hover:shadow-md transition-shadow duration-300 flex flex-col gap-4 animate-card">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">{f.icon}</div>
                <h3 className="font-extrabold text-lg text-secondary">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ FEATURED PRODUCTS (existing) ══════════════════ */}
      <section ref={productsRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 animate-title">
            <div className="flex flex-col gap-4 text-left">
              <span className="text-primary font-bold text-sm tracking-widest uppercase">FEATURED UNITS</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
                Our Most Popular Modular Builds
              </h2>
            </div>
            <Link to="/products" className="mt-4 md:mt-0 bg-secondary hover:bg-secondary-light text-white font-semibold px-6 py-3 rounded-xl transition-all">
              Browse Full Catalog
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group flex flex-col bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 product-card">
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-primary text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {product.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow text-left gap-4">
                  <h3 className="font-extrabold text-lg text-secondary leading-snug group-hover:text-primary transition-colors">{product.name}</h3>
                  <div className="text-primary font-black text-2xl">{product.price}</div>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{product.description}</p>
                  <div className="bg-slate-50 p-4 rounded-xl flex flex-col gap-1.5 text-xs text-slate-600 border border-slate-100">
                    <div><span className="font-semibold text-slate-700">Size:</span> {product.specs.size}</div>
                    <div><span className="font-semibold text-slate-700">Shell:</span> {product.specs.material}</div>
                  </div>
                  <div className="mt-auto pt-2">
                    <Link to={`/quote?product=${encodeURIComponent(product.name)}`} className="w-full bg-slate-100 group-hover:bg-primary group-hover:text-white text-secondary text-center text-sm font-bold py-3 px-4 rounded-xl transition-all duration-300 block">
                      Request Quote
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ NEW: ABOUT SECTION ══════════════════ */}
      <section ref={aboutRef} className="py-24 bg-secondary relative overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none animate-float-slow" />

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-16 animate-item">
            <span className="text-primary font-bold text-sm tracking-widest uppercase">WHO WE ARE</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
              A Trusted Global Leader in Modular Container Structures
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed">
              We design, equip, and deliver turnkey prefabricated container buildings, portable office cabins, storage blocks, and security kiosks to clients worldwide — ready for immediate operation.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-item">
            {stats.map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center flex flex-col items-center gap-3 hover:bg-white/10 transition-colors duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                  {s.icon}
                </div>
                <CountUp end={s.end} suffix={s.suffix} className="text-4xl font-black text-white" />
                <div className="text-slate-400 text-sm font-medium tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Two-column image + text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center animate-item">
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-full h-full border-2 border-primary/30 rounded-3xl" />
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800"
                alt="ModulerContainerHub factory workshop"
                className="relative rounded-3xl w-full h-[380px] object-cover shadow-2xl"
              />
              <div className="absolute bottom-5 left-5 bg-primary text-white px-5 py-3 rounded-xl shadow-xl font-bold text-sm flex items-center gap-2">
                <ShieldCheck size={16} />
                ISO-Certified Manufacturing
              </div>
            </div>
            <div className="flex flex-col gap-6 text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                Why ModulerContainerHub?
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                By controlling every step — layout configuration, electrical pre-installation, insulation, and structural compliance — entirely within our workshops, we eliminate construction delays. Clients receive structures delivered to site and ready to operate immediately.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  'Galvanized, double-coated steel frames resist rust & weather',
                  'Pre-installed certified electrical boards & wiring',
                  'Custom CAD-based layouts matched to your exact site drawings',
                  'Regional compliance with local building & safety codes',
                  'Dedicated after-delivery support and buy-back program'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="w-2 h-2 rounded-full bg-primary block" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/about" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-7 py-3.5 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all duration-300 w-fit mt-2">
                <span>Learn More About Us</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ NEW: SERVICES SECTION ══════════════════ */}
      <section ref={servicesRef} className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-16 animate-title">
            <span className="text-primary font-bold text-sm tracking-widest uppercase">WHAT WE OFFER</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary mt-3 tracking-tight">
              Our Complete Range of Container Services
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto mt-4 text-sm leading-relaxed">
              From supply and customization to delivery, leasing, and buy-back — we handle every stage of your container solution.
            </p>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {homeServices.map((svc) => (
              <div
                key={svc.id}
                className="group bg-white border border-slate-100 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 svc-card"
              >
                <div className={`w-13 h-13 w-14 h-14 rounded-2xl flex items-center justify-center ${svc.color} group-hover:scale-110 transition-transform duration-300`}>
                  {svc.icon}
                </div>
                <h3 className="font-extrabold text-base text-secondary group-hover:text-primary transition-colors leading-snug">
                  {svc.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed flex-grow">
                  {svc.desc}
                </p>
                <Link
                  to="/services"
                  className="text-primary hover:text-primary-dark font-bold text-xs flex items-center gap-1 group/link mt-auto"
                >
                  <span>Learn More</span>
                  <ArrowRight size={13} className="transform group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            ))}

            {/* CTA card */}
            <div className="bg-primary rounded-2xl p-6 flex flex-col gap-4 justify-between svc-card">
              <div className="flex flex-col gap-3">
                <span className="text-white/70 text-xs font-bold uppercase tracking-widest">Custom Project?</span>
                <h3 className="font-extrabold text-xl text-white leading-snug">
                  Need a Bespoke Container Build?
                </h3>
                <p className="text-white/80 text-xs leading-relaxed">
                  Tell us your exact site layout, dimensions, and utilities — we'll engineer it from scratch.
                </p>
              </div>
              <Link
                to="/quote"
                className="bg-white hover:bg-slate-100 text-primary font-bold text-sm py-3 px-5 rounded-xl transition-all duration-300 text-center block"
              >
                Request Custom Quote
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="inline-flex items-center gap-2 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300">
              <span>View All Services</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════ NEW: REVIEWS SECTION ══════════════════ */}
      <section ref={reviewsRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-16 animate-title">
            <span className="text-primary font-bold text-sm tracking-widest uppercase">CLIENT TESTIMONIALS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary mt-3 tracking-tight">
              What Our Clients Say
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto mt-4 text-sm leading-relaxed">
              Trusted by construction firms, logistics companies, estates, and event organizers worldwide.
            </p>
            {/* Average rating badge */}
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-5 py-2.5 rounded-full mt-6">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-amber-400 text-amber-400" />)}
              </div>
              <span className="text-amber-800 font-extrabold text-sm">5.0</span>
              <span className="text-amber-600 text-xs font-medium">— Average from 200+ verified reviews</span>
            </div>
          </div>

          {/* Reviews grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="group bg-slate-50 border border-slate-100 rounded-3xl p-7 flex flex-col gap-5 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 review-card relative"
              >
                {/* Quote icon */}
                <div className="absolute top-6 right-6 text-primary/10 group-hover:text-primary/20 transition-colors">
                  <QuoteIcon size={40} className="fill-current" />
                </div>

                {/* Stars */}
                <StarRow count={r.rating} />

                {/* Review text */}
                <p className="text-slate-600 text-sm leading-relaxed flex-grow relative z-10">
                  "{r.text}"
                </p>

                {/* Divider */}
                <div className="border-t border-slate-200/80" />

                {/* Reviewer */}
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0 shadow-md">
                    {r.avatar}
                  </div>
                  <div>
                    <div className="font-extrabold text-secondary text-sm">{r.name}</div>
                    <div className="text-slate-400 text-xs">{r.role}</div>
                    <div className="text-primary text-xs font-semibold">{r.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA BOTTOM BANNER ══════════════════ */}
      <section className="relative py-20 bg-secondary overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none animate-float-slow" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col gap-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
            Ready to Build and Deploy Your Container Space?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto leading-relaxed">
            Contact our engineering team to design, equip, and ship the exact modular solution your operations require.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link to="/quote" className="btn-shine bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3.5 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              Get Custom Quote
            </Link>
            <Link to="/contact" className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-xl border border-white/20 transition-all duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
