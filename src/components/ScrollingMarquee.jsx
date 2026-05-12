import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollingMarquee = () => {
  const marqueeRef = useRef(null);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;

    const loop = gsap.to(marquee, {
      xPercent: -50,
      ease: "none",
      duration: 100,
      repeat: -1,
    });

    const trigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const velocity = self.getVelocity() * 0.005;
        gsap.to(loop, {
          timeScale: 1 + Math.abs(velocity),
          duration: 0.5,
        });
      },
    });

    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      gsap.to(cursorRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      if (trigger) trigger.kill();
      loop.kill();
    };
  }, []);

  const marqueeTexts = [
    "Not Algorithms",
    "Chasing Consumers",
    "Not Algorithms",
    "Chasing Consumers",
  ];

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden w-full py-10 lg:py-20 cursor-none group"
    >
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-24 h-24 z-[999] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-cover bg-center rounded-full shadow-xl"
        style={{
          backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkwliXoP-keoFbRwEsom3UQhi3I-HT6yUr4g&s')`,
        }}
      >
        <span className="text-white font-bold text-xs uppercase">View</span>
      </div>

      <div className="flex whitespace-nowrap py-4">
        <div ref={marqueeRef} className="flex items-center gap-x-10 px-5">
          {marqueeTexts.map((text, index) => (
            <React.Fragment key={index}>
              <h2 className="text-5xl md:text-[200px] md:text-9xl font-bold tracking-tighter text-black">
                {text}
              </h2>
              <div className="w-[15vw] h-[15vw] md:w-[12vw] md:h-[12vw] shrink-0 overflow-hidden rounded-3xl bg-gray-200">
                <img
                  src={
                    index % 2 === 0
                      ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGa70BgePn1Rsf41oiG6ac0_TAzpKXj4d9qg&s"
                      : "https://cdn.pixabay.com/photo/2015/04/19/08/32/flower-729510_1280.jpg"
                  }
                  alt="work"
                  className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-700"
                />
              </div>
            </React.Fragment>
          ))}

          {marqueeTexts.map((text, index) => (
            <React.Fragment key={`clone-${index}`}>
              <h2 className="text-7xl md:text-9xl font-medium tracking-tighter text-black uppercase">
                {text}
              </h2>
              <div className="w-[15vw] h-[15vw] md:w-[12vw] md:h-[12vw] shrink-0 overflow-hidden rounded-3xl bg-gray-200">
                <img
                  src={
                    index % 2 === 0
                      ? "https://rise-atseven.transforms.svdcdn.com/production/images/IMG_5023.jpg?w=800"
                      : "https://rise-atseven.transforms.svdcdn.com/production/images/Screenshot-2025-06-25-at-14.49.00.png?w=800"
                  }
                  alt="work"
                  className="w-full h-full object-cover"
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollingMarquee;
