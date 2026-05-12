import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WaveMarquee = () => {
  const textPathRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.getAll().forEach((t) => t.kill());

    gsap.fromTo(
      textPathRef.current,
      { attr: { startOffset: "15%" } },
      {
        attr: { startOffset: "-55%" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: "42vw", minHeight: "280px", maxHeight: "560px" }}
    >
      <svg
        viewBox="0 0 1400 500"
        className="absolute bottom-0 left-0 w-full h-full overflow-visible select-none"
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          <path
            id="curvePath"
            d="M-300,420 C300,420 800,420 1150,418 C1250,415 1320,320 1450,320"
            fill="none"
          />
        </defs>

        <text
          style={{
            fontSize: "clamp(75px, 11vw, 200px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            fill: "#1a1a1a",
          }}
        >
          <textPath
            ref={textPathRef}
            href="#curvePath"
            startOffset="15%"
          >
            Ready to Rise at Seven Ready to Rise at Seven
          </textPath>
        </text>
      </svg>
    </section>
  );
};

export default WaveMarquee;