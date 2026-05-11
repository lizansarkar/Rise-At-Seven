import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const featuredData = [
  {
    id: 1,
    title: "JD Sports",
    year: "[2025]",
    img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070",
    color: "#e28743",
  },
  {
    id: 2,
    title: "Parkdean Resorts",
    year: "[2019-2025]",
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070",
    color: "#543310",
  },
  {
    id: 3,
    title: "Pooky",
    year: "[2025]",
    img: "https://images.unsplash.com/photo-1513519247388-193ad51f50ab?q=80&w=2070",
    color: "#748E63",
  },
  {
    id: 4,
    title: "Revolution Beauty",
    year: "[2022-2025]",
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2070",
    color: "#D2649A",
  },
  {
    id: 5,
    title: "Fashion Nova",
    year: "[2024-2025]",
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2070",
    color: "#FF6B9D",
  },
  {
    id: 6,
    title: "Tech Startup",
    year: "[2023-2025]",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070",
    color: "#4A90E2",
  },
  {
    id: 7,
    title: "Green Living",
    year: "[2024]",
    img: "https://images.unsplash.com/photo-1559027615-cd2628902d4a?q=80&w=2070",
    color: "#00C853",
  },
  {
    id: 8,
    title: "Urban Fitness",
    year: "[2023-2025]",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070",
    color: "#FF9800",
  },
  {
    id: 9,
    title: "Luxury Brands",
    year: "[2025]",
    img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070",
    color: "#9C27B0",
  },
  {
    id: 10,
    title: "Digital Agency",
    year: "[2022-2025]",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070",
    color: "#F44336",
  },
];

function FeaturedSection() {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const cursorRef = useRef(null);
  const contextRef = useRef(null);
  const [activeItem, setActiveItem] = useState(null);
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    // Kill all existing triggers first
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Create new context
    let ctx = gsap.context(() => {
      // Desktop only: Pin left section
      if (window.innerWidth > 1024) {
        const trigger = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: leftRef.current,
          pinSpacing: false,
        });

        // Animate titles
        featuredData.forEach((item, i) => {
          gsap.fromTo(
            `.title-item-${i}`,
            { opacity: 0.3, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              scrollTrigger: {
                trigger: `.img-box-${i}`,
                start: "top 70%",
                end: "top 30%",
                scrub: 0.5,
              },
            }
          );
        });
      }
    }, containerRef);

    contextRef.current = ctx;

    return () => {
      // Clean up properly
      if (contextRef.current) {
        contextRef.current.revert();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Custom cursor movement
  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current && cursorVisible) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    if (cursorVisible) {
      window.addEventListener("mousemove", moveCursor);
    }

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorVisible]);

  // Title hover → Image auto hover (no cursor)
  const handleTitleHover = (id, index) => {
    setActiveItem(id);
    setCursorVisible(false);
    gsap.to(`.title-inner-${index}`, {
      x: 20,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleTitleLeave = (index) => {
    setActiveItem(null);
    setCursorVisible(false);
    gsap.to(`.title-inner-${index}`, {
      x: 0,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  // Image hover → show cursor + highlight
  const handleImageEnter = (id) => {
    setActiveItem(id);
    setCursorVisible(true);
    gsap.to(cursorRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      overwrite: "auto",
    });
  };

  const handleImageLeave = () => {
    setActiveItem(null);
    setCursorVisible(false);
    gsap.to(cursorRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      overwrite: "auto",
    });
  };

  return (
    <section ref={containerRef} className="relative w-full bg-[#0a0a0a] text-white">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-20 h-20 bg-[#a3ffcc] rounded-full pointer-events-none z-[999] flex items-center justify-center opacity-0 scale-0 -translate-x-1/2 -translate-y-1/2"
        style={{ cursor: "none" }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>

      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        {/* LEFT: Sticky Titles */}
        <div
          ref={leftRef}
          className="w-full lg:w-1/2 h-screen px-6 sm:px-8 lg:px-16 py-16 lg:py-0 flex flex-col justify-center sticky top-0 bg-[#0a0a0a]"
        >
          {/* Top gradient */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0a0a0a] to-transparent pointer-events-none z-10"></div>

          <span className="text-xs font-semibold mb-8 block opacity-40 uppercase tracking-widest">
            Featured Work
          </span>

          <div className="flex flex-col gap-y-4 sm:gap-y-6">
            {featuredData.map((item, index) => (
              <div
                key={item.id}
                className={`title-item-${index} overflow-hidden py-2 sm:py-3 opacity-30 transition-opacity duration-300 ${
                  activeItem === item.id ? "opacity-100" : "opacity-30"
                }`}
                onMouseEnter={() => handleTitleHover(item.id, index)}
                onMouseLeave={() => handleTitleLeave(index)}
                style={{ cursor: "default", userSelect: "none" }}
              >
                <div className={`title-inner-${index} inline-block`}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold flex items-baseline gap-2 sm:gap-3 whitespace-nowrap sm:whitespace-normal">
                    {item.title}
                    <span className="text-[8px] sm:text-[9px] opacity-40 font-light tracking-wide flex-shrink-0">
                      {item.year}
                    </span>
                  </h2>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none z-10"></div>
        </div>

        {/* RIGHT: Scrollable Images */}
        <div className="w-full lg:w-1/2 px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20 flex flex-col gap-y-4 sm:gap-y-6 lg:gap-y-8">
          {featuredData.map((item, index) => (
            <div
              key={item.id}
              className={`img-box-${index} w-full flex flex-col relative group`}
              onMouseEnter={() => handleImageEnter(item.id)}
              onMouseLeave={handleImageLeave}
              style={{
                cursor:
                  cursorVisible && activeItem === item.id ? "none" : "default",
              }}
            >
              {/* Image Container */}
              <div className="relative w-full aspect-video sm:aspect-[16/10] overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl bg-[#1a1a1a]">
                {/* Image */}
                <img
                  src={item.img}
                  alt={item.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                    activeItem === item.id ? "scale-100 opacity-30" : "scale-100 opacity-100"
                  }`}
                  loading="lazy"
                />

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 rounded-lg sm:rounded-xl lg:rounded-2xl transition-all duration-500 ${
                    activeItem === item.id ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${item.color}40 0%, ${item.color}10 100%)`,
                  }}
                />

                {/* Content on Hover */}
                <div
                  className={`absolute inset-0 flex flex-col justify-between p-4 sm:p-6 lg:p-10 z-10 transition-all duration-700 ${
                    activeItem === item.id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  {/* Title */}
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-white">
                      {item.title}
                    </h3>
                  </div>

                  {/* Bottom Button */}
                  <div className="flex justify-end">
                    <button
                      className="flex items-center gap-2 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-[#a3ffcc] hover:text-black transition-all duration-300 text-xs sm:text-sm"
                      onClick={() => console.log(`Clicked ${item.title}`)}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                      <span className="font-medium hidden sm:inline">View</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                        <polyline points="16 7 22 7 22 13"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedSection;