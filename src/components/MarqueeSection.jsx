import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

/**
 * Custom wrap function to loop the marquee infinitely
 */
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const MarqueeSection = () => {
  const logos = [
    {
      id: 1,
      src: "https://cdn.worldvectorlogo.com/logos/emirates-fly-better-logo-5.svg",
      alt: "Emirates",
    },
    {
      id: 2,
      src: "https://cdn.worldvectorlogo.com/logos/emirates-fly-better-logo-5.svg",
      alt: "AA",
    },
    {
      id: 3,
      src: "https://cdn.worldvectorlogo.com/logos/emirates-fly-better-logo-5.svg",
      alt: "Red Bull",
    },
    {
      id: 4,
      src: "https://cdn.worldvectorlogo.com/logos/emirates-fly-better-logo-5.svg",
      alt: "SN",
    },
    {
      id: 5,
      src: "https://cdn.worldvectorlogo.com/logos/emirates-fly-better-logo-5.svg",
      alt: "Logo 5",
    },
    {
      id: 6,
      src: "https://cdn.worldvectorlogo.com/logos/emirates-fly-better-logo-5.svg",
      alt: "Logo 6",
    },
  ];

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // Loops the x position between -20% and -45% for seamless motion
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(-1); // Default direction: Left
  const isDragging = useRef(false);

  useAnimationFrame((t, delta) => {
    if (isDragging.current) return; // Pause auto-animation during manual drag

    let moveBy = directionFactor.current * 5 * (delta / 2000);

    // Increases speed based on scroll velocity
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="w-full bg-[#eeeeee] py-12 overflow-hidden flex items-center relative">
      <div className="pl-10 pr-10 whitespace-nowrap z-50 bg-[#eeeeee] relative">
        <span className="text-black font-medium text-sm md:text-base tracking-tight">
          The agency behind ...
        </span>
      </div>
      <div className="flex-1 relative h-24 overflow-hidden">

        {/* Left Side Blur */}
        <div
          className="absolute inset-y-0 left-0 w-42 z-60 pointer-events-none backdrop-blur-[5px]"
          style={{
            maskImage:
              "linear-gradient(to right, black 20%, rgba(0,1,1,1) 60%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, black 20%, rgba(0,1,1,1) 60%, transparent 100%)",
          }}
        />

        {/* Right Side Blur */}
        <div
          className="absolute inset-y-0 right-0 w-42 z-60 pointer-events-none backdrop-blur-[12px]"
          style={{
            maskImage:
              "linear-gradient(to left, black 0%, rgba(1,1,1,1) 60%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to left, black 0%, rgba(1,1,1,1) 60%, transparent 100%)",
          }}
        />

        <motion.div
          className="flex whitespace-nowrap gap-20 md:gap-32 items-center h-full cursor-grab active:cursor-grabbing"
          style={{ x }}
          drag="x"
          onDragStart={() => {
            isDragging.current = true;
          }}
          onDragEnd={(e, info) => {
            isDragging.current = false;
            // Sets new direction based on drag velocity
            if (info.velocity.x !== 0) {
              directionFactor.current = info.velocity.x > 0 ? 1 : -1;
            }
          }}
          // Updates baseX value directly while dragging
          onDrag={(e, info) => {
            const currentX = baseX.get();
            baseX.set(currentX + info.delta.x * 0.05);
          }}
        >
          {/* Triple set of logos to ensure infinite loop coverage */}
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <img
              key={`${logo.id}-${index}`}
              src={logo.src}
              alt={logo.alt}
              draggable="false"
              className="h-8 md:h-8 w-auto object-contain opacity-90 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100"
              style={{ cursor: "pointer" }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MarqueeSection;
