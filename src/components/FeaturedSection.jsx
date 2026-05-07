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
];

function FeaturedSection() {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const cursorRef = useRef(null);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Sticky Scroll Effect for Left Content
      if (window.innerWidth > 1024) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: leftRef.current,
          scrub: true,
        });

        featuredData.forEach((_, i) => {
          gsap.fromTo(
            `.title-inner-${i}`,
            { y: "100%", opacity: 0.1 },
            {
              y: "0%",
              opacity: 1,
              scrollTrigger: {
                trigger: `.img-box-${i}`,
                start: "top 80%",
                end: "top 20%",
                scrub: 1,
              },
            },
          );
        });
      }

      // 2. Custom Cursor Movement Logic
      const moveCursor = (e) => {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.4,
          ease: "power2.out",
        });
      };
      window.addEventListener("mousemove", moveCursor);
      return () => window.removeEventListener("mousemove", moveCursor);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // --- Interaction Handlers ---

  // টাইটেল হোভার: কার্সর দেখাবে না, শুধু টেক্সট অ্যানিমেশন হবে
  const handleTitleHover = (id, index) => {
    setActiveItem(id);
    gsap.to(`.title-inner-${index}`, {
      x: 30,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleTitleLeave = (index) => {
    setActiveItem(null);
    gsap.to(`.title-inner-${index}`, {
      x: 0,
      duration: 0.4,
      ease: "power2.out",
      fontStyle: "normal",
    });
  };

  // ইমেজ হোভার: এখানে কাস্টম কার্সর দৃশ্যমান হবে
  const handleImageEnter = (id) => {
    setActiveItem(id);
    gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
  };

  const handleImageLeave = () => {
    setActiveItem(null);
    gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3 });
  };

  return (
    <section>
      <div
        ref={containerRef}
        className="w-full bg-[#0a0a0a] text-white min-h-screen relative overflow-hidden rounded-3xl"
      >
        <div
          ref={cursorRef}
          className="fixed top-0 left-0 w-24 h-24 bg-[#a3ffcc] rounded-full pointer-events-none z-[999] flex items-center justify-center opacity-0 scale-0 -translate-x-1/2 -translate-y-1/2"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>

        <div className="flex flex-col lg:flex-row w-full">
          {/* Left Side: Animated Titles */}
          <div
            ref={leftRef}
            className="lg:w-[45%] w-full h-fit lg:h-screen flex flex-col justify-center px-10 lg:px-20 relative"
          >
            <span className="text-sm font-semibold mb-10 block opacity-40 uppercase tracking-widest">
              Featured Work
            </span>

            <div className="flex flex-col gap-y-4">
              {featuredData.map((item, index) => (
                <div
                  key={item.id}
                  className="overflow-hidden py-2"
                  onMouseEnter={() => handleTitleHover(item.id, index)}
                  onMouseLeave={() => handleTitleLeave(index)}
                >
                  <div
                    className={`title-inner-${index} inline-block transition-all duration-300`}
                  >
                    <h2 className="text-5xl md:text-7xl font-bold cursor-pointer flex items-start">
                      {item.title}
                      <span className="text-[10px] ml-2 mt-2 opacity-30 font-light tracking-normal">
                        {item.year}
                      </span>
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Scrollable Images */}
          <div className="lg:w-[45%] w-full px-6 lg:pr-20 py-20 ml-auto flex flex-col gap-y-5">
            {featuredData.map((item, index) => (
              <div
                key={item.id}
                className={`img-box-${index} w-full flex flex-col relative group ${activeItem === item.id ? "active-reveal" : ""}`}
                onMouseEnter={() => handleImageEnter(item.id)}
                onMouseLeave={handleImageLeave}
                style={{ "--hover-bg-color": item.color }}
              >
                {/* Image Container */}
                <div
                  className="relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-[#1a1a1a]"
                  style={{ cursor: "none" }}
                >
                  <div className="hover-reveal-bg"></div>
                  <div
                    className={`absolute inset-0 flex flex-col justify-start pt-16 px-12 z-10 transition-all duration-700 delay-100 ${activeItem === item.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  >
                    <div
                      className={`absolute inset-0 flex flex-col justify-between p-10 z-10 transition-all duration-700 ${activeItem === item.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    >
                      <div className="text-left">
                        <h4 className="text-white text-3xl md:text-5xl font-bold leading-tight">
                          {item.title} <br />
                        </h4>
                      </div>

                      <div className="flex justify-end items-end w-full absolute bottom-6 right-6 z-20">
                        <div
                          className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-xl transition-all duration-300 group hover:bg-[#a3ffcc]"
                          style={{ cursor: "pointer" }}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="text-white group-hover:text-black transition-colors"
                          >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          </svg>

                          <span className="text-white text-sm font-medium tracking-tight group-hover:text-black transition-colors">
                            {item.title}
                          </span>

                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="text-white group-hover:text-black transition-colors"
                          >
                            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                            <polyline points="16 7 22 7 22 13"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <img
                    src={item.img}
                    alt={item.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${activeItem === item.id ? "scale-110 blur-sm opacity-20" : "scale-100 opacity-100"}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-3 lg:mt-7">
        <button className="btn-sweep">
          <div className="sweep-text">
            <span className="flex items-center gap-2">
              Explore Our Work <span className="text-xs">↗</span>
            </span>

            <span className="flex items-center gap-2">
              Explore Our Work <span className="text-xs">↗</span>
            </span>
          </div>
        </button>
      </div>
    </section>
  );
}

export default FeaturedSection;
