import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Renders a top reading-progress bar plus a floating back-to-top button.
 * Both are purely presentational and shared across every public page.
 */
const ScrollUtilities: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(pct);
      setShowTop(scrollTop > 600);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* Reading progress bar */}
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      {/* Back-to-top */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary hover:bg-primary-dark text-white shadow-lg flex items-center justify-center transition-all duration-300 ${
          showTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
};

export default ScrollUtilities;
