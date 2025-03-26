import React from 'react';
import { useEffect, useRef } from 'react';

const ScrollReveal = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  
  const delayClass = delay ? `reveal-delay-${delay}` : '';
  
  return (
    <div ref={ref} className={`reveal-on-scroll ${delayClass} ${className}`}>
      {children}
    </div>
  );
};

export default ScrollReveal;