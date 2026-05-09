import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StackSection = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const cardsRef = useRef([]);

  const cards = [
    {
      id: 1,
      title: "Pioneers",
      desc: "We're dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search with Digital PR, and Social Search.",
      bg: "bg-[#0d0d0d]",
      textColor: "text-white",
      borderColor: "border-white",
      rotate: 0,
      img: "https://rise-atseven.transforms.svdcdn.com/production/images/b2087e0cd3f699d3efc76f809ec72a85a6ab378e-1080x1350.jpg?w=800&h=800&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5",
    },
    {
      id: 2,
      title: "Award Winning",
      desc: "A roll top bath full of 79 awards. Voted The Drum's best agency outside of London. We are official judges for industry awards including Global Search Awards.",
      bg: "bg-[#b8ffd9]",
      textColor: "text-[#0d0d0d]",
      borderColor: "border-[#0d0d0d]",
      rotate: 6,
      img: "https://rise-atseven.transforms.svdcdn.com/production/images/IMG_5023.jpg?w=800",
    },
    {
      id: 3,
      title: "Speed",
      desc: "Ever heard the saying Early Bird catches the worm? Google is moving fast, but humans are moving faster. We chase consumers, not algorithms.",
      bg: "bg-white",
      textColor: "text-[#0d0d0d]",
      borderColor: "border-[#0d0d0d]",
      rotate: 12,
      img: "https://rise-atseven.transforms.svdcdn.com/production/images/Screenshot-2025-06-23-at-23.15.19.png?w=800&h=800&q=80&fm=webp&fit=crop",
    },
  ];

  const PEEK = 12;

  useEffect(() => {
    const cards_el = cardsRef.current;
    const total = cards.length;

    ScrollTrigger.getAll().forEach((t) => t.kill());

    cards_el.forEach((card, i) => {
      gsap.set(card, {
        y: i * PEEK,
        rotate: cards[i].rotate,
        zIndex: total - i,
        scale: 1 - i * 0.03,
        transformOrigin: "center center",
      });
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${(total - 1) * window.innerHeight}px`,
      pin: wrapperRef.current,
      pinSpacing: true,
      anticipatePin: 1,
    });

    cards_el.forEach((card, i) => {
      if (i === total - 1) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: `+=${i * window.innerHeight}px`,
        end: `+=${(i + 1) * window.innerHeight}px`,
        scrub: 1,
        onUpdate(self) {
          const p = self.progress;
          gsap.set(card, {
            y: -p * window.innerHeight * 1.2,
            rotate: cards[i].rotate - p * 10,
            opacity: p > 0.5 ? 1 - (p - 0.5) / 0.5 : 1,
          });

          for (let j = i + 1; j < total; j++) {
            const slotsBelow = j - (i + 1);
            const targetY = slotsBelow * PEEK;
            gsap.to(cards_el[j], {
              y: targetY,
              // rotate: gsap.utils.interpolate(cards[j].rotate, 0, p),
              scale: gsap.utils.interpolate(1 - (j - i) * 0.03, 1 - slotsBelow * 0.03, p),
              duration: 0.1,
              overwrite: "auto",
            });
          }
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="bg-[#efeeec]" 
      style={{ height: `${cards.length * 100}vh` }}
    >
      <div 
        ref={wrapperRef} 
        className="h-screen flex flex-col items-center justify-center bg-primary overflow-hidden"
      >
        {/* Pill label */}
        <p className="mb-30 text-sm md:text-xl  border border-primary rounded-full px-6 py-2 font-bold">
          Legacy In The Making
        </p>

        {/* Card stack container */}
        <div className="relative w-[88vw] max-w-[600px] h-[550px]">
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`absolute inset-0 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.12)] flex flex-col items-center text-center p-10 will-change-transform ${card.bg} ${card.textColor}`}
            >
              {/* Image Area */}
              <div className="w-[180px] h-[180px] rounded-[1.5rem] overflow-hidden mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex-shrink-0">
                <img 
                  src={card.img} 
                  alt={card.title} 
                  className="w-full h-full object-cover" 
                />
              </div>

              <h2 className="text-5xl md:text-[3.5rem] font-extrabold mb-4 tracking-tighter leading-none flex-shrink-0">
                {card.title}
              </h2>

              <p className="text-[0.9rem] leading-relaxed opacity-80 max-w-[320px] mb-8 overflow-hidden">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StackSection;