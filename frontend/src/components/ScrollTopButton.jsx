import React, { useEffect, useState } from 'react';

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`md:w-[60px] md:h-[60px] w-[50px] h-[50px] fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 bg-[#fd5168] text-white rounded-md shadow-xl transition-opacity duration-300 cursor-pointer 
        hover:bg-[#e0445a] hover:scale-105 active:scale-95 
        animate-bounce 
        ${visible ? 'opacity-100' : 'opacity-0'}`}
      aria-label={isHovered ? 'Click to scroll to top' : 'Scroll to top'}
    >
      <i className="fa-sharp-duotone fa-solid fa-angle-up transition md:text-xl text:md duration-300 hover:text-white hover:drop-shadow-md"></i>
    </button>
  );
}