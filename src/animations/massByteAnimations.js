import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const staggerReveal = (targets, options = {}) => {
  gsap.fromTo(
    targets,
    {
      y: 40,
      opacity: 0,
      rotateX: -8,
      transformOrigin: 'top center',
    },
    {
      y: 0,
      opacity: 1,
      rotateX: 0,
      ease: 'power3.out',
      duration: 1,
      stagger: 0.12,
      ...options,
    },
  );
};

export const floatingOrganic = (target, strength = 12) => {
  return gsap.to(target, {
    y: strength,
    rotation: 1,
    duration: 3,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });
};

export const parallaxImage = (target, options = {}) => {
  gsap.to(target, {
    yPercent: -18,
    ease: 'none',
    scrollTrigger: {
      trigger: target,
      scrub: true,
      start: 'top bottom',
      ...options,
    },
  });
};

export const gradientPulse = (target) => {
  gsap.to(target, {
    backgroundPosition: '200% center',
    ease: 'linear',
    duration: 8,
    repeat: -1,
  });
};

export const depthEntrance = (target, options = {}) => {
  gsap.from(target, {
    opacity: 0,
    scale: 0.94,
    filter: 'blur(8px)',
    duration: 1.2,
    ease: 'power3.out',
    ...options,
  });
};

export const setupScrollLayers = (container) => {
  const layers = container?.querySelectorAll('[data-depth]') || [];
  layers.forEach((layer) => {
    const depth = parseFloat(layer.dataset.depth || '1');
    gsap.to(layer, {
      yPercent: -15 * depth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        scrub: true,
      },
    });
  });
};
