import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

function TopBar() {
  const containerRef = useRef(null);
  const labelRef = useRef(null);
  const hoverLabelRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const label = labelRef.current;
    const hoverLabel = hoverLabelRef.current;

    if (!container) return;
    gsap.set(hoverLabel, { y: 25, opacity: 0 });

    // GSAP Timeline
    const tl = gsap.timeline({ paused: true });
    tl.to(label, { 
        y: -25, 
        opacity: 0, 
        duration: 0.4, 
        ease: "power2.inOut" 
      }, 0)
      .to(hoverLabel, { 
        y: 0, 
        opacity: 1, 
        duration: 0.4, 
        ease: "power2.inOut" 
      }, 0);

    const handleEnter = () => tl.play();
    const handleLeave = () => tl.reverse();

    container.addEventListener('mouseenter', handleEnter);
    container.addEventListener('mouseleave', handleLeave);

    return () => {
      container.removeEventListener('mouseenter', handleEnter);
      container.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div className="w-full bg-[#efeeec] px-2 pb-2">
      <div
        ref={containerRef}
        className="relative bg-[#b2f6e3] rounded-full py-[0.3rem] px-6 flex justify-center items-center cursor-pointer overflow-hidden group"
      >
        <div className="relative h-5 flex flex-col items-center justify-center overflow-hidden">
          <p
            ref={labelRef}
            className="text-neutral font-bold text-sm md:text-sm tracking-tight text-center whitespace-nowrap"
          >
            <span className="mr-2">🚨</span>
            Where are your customers actually searching? Download the report
          </p>
          
          <p
            ref={hoverLabelRef}
            className="absolute text-neutral font-bold text-sm md:text-sm tracking-tight text-center whitespace-nowrap"
          >
            <span className="mr-2">🚨</span>
            Where are your customers actually searching? Download the report
          </p>
        </div>
      </div>
    </div>
  );
}

export default TopBar;