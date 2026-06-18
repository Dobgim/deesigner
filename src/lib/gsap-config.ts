import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const animateFadeIn = (
  element: string | HTMLElement, 
  direction: 'up' | 'down' | 'left' | 'right' | 'none' = 'up',
  delay = 0,
  duration = 0.8
) => {
  let x = 0;
  let y = 0;

  if (direction === 'up') y = 40;
  if (direction === 'down') y = -40;
  if (direction === 'left') x = 40;
  if (direction === 'right') x = -40;

  gsap.fromTo(
    element,
    { opacity: 0, x, y },
    {
      opacity: 1,
      x: 0,
      y: 0,
      delay,
      duration,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
};

export const animateStaggeredFadeIn = (
  elements: string | HTMLElement[],
  direction: 'up' | 'down' | 'left' | 'right' | 'none' = 'up',
  stagger = 0.15,
  duration = 0.8
) => {
  let x = 0;
  let y = 0;

  if (direction === 'up') y = 30;
  if (direction === 'down') y = -30;
  if (direction === 'left') x = 30;
  if (direction === 'right') x = -30;

  gsap.fromTo(
    elements,
    { opacity: 0, x, y },
    {
      opacity: 1,
      x: 0,
      y: 0,
      stagger,
      duration,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: Array.isArray(elements) ? elements[0] : elements,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
};

export default gsap;
