import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: 1,
    title: "Pioneers",
    desc: "We're dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search with Digital PR, and Social Search.",
    bg: "bg-[#0d0d0d]",
    textColor: "text-white",
    rotate: 0,
    img: "https://rise-atseven.transforms.svdcdn.com/production/images/b2087e0cd3f699d3efc76f809ec72a85a6ab378e-1080x1350.jpg?w=2000&h=2000&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847630&s=69735376fddade35059585570e316087",
  },
  {
    id: 2,
    title: "Award Winning",
    desc: "A roll top bath full of 79 awards. Voted The Drum's best agency outside of London. We are official judges for industry awards including Global Search Awards.",
    bg: "bg-[#b8ffd9]",
    textColor: "text-[#0d0d0d]",
    rotate: 6,
    img: "https://static.vecteezy.com/system/resources/thumbnails/049/874/086/small/close-up-of-a-person-s-hand-holding-blank-polaroid-photo.jpeg",
  },
  {
    id: 3,
    title: "Speed",
    desc: "Ever heard the saying Early Bird catches the worm? Google is moving fast, but humans are moving faster. We chase consumers, not algorithms.",
    bg: "bg-white",
    textColor: "text-[#0d0d0d]",
    rotate: 12,
    img: "https://rise-atseven.transforms.svdcdn.com/production/images/Screenshot-2025-06-23-at-23.15.19.png?w=2000&h=2000&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847626&s=211fe5c665b93a978c596f9070aed44c",
  },
];

const PEEK = 12;

const StackSection = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const total = cards.length;
    let timer;
    const triggers = [];

    const init = () => {
      triggers.forEach((t) => t.kill());
      triggers.length = 0;

      const cards_el = cardsRef.current;
      if (!containerRef.current || !wrapperRef.current) return;
      if (cards_el.length !== total || cards_el.some((el) => !el)) return;

      cards_el.forEach((card, i) => {
        gsap.set(card, {
          y: i * PEEK,
          rotate: cards[i].rotate,
          zIndex: total - i,
          scale: 1 - i * 0.03,
          transformOrigin: "center center",
          clearProps: "opacity",
        });
      });

      triggers.push(
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: `+=${(total - 1) * window.innerHeight}`,
          scrub: true,
          pin: wrapperRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const progress = self.progress * (total - 1);
            const currentStep = Math.min(total - 2, Math.floor(progress));
            const stepProgress = progress - currentStep;

            cards_el.forEach((card, j) => {
              const baseY = j * PEEK;

              if (j < currentStep) {
                gsap.set(card, {
                  y: -window.innerHeight * 1.2,
                  opacity: 0,
                });
                return;
              }

              if (j === currentStep) {
                gsap.set(card, {
                  y: baseY - stepProgress * window.innerHeight * 1.2,
                  rotate: cards[j].rotate - stepProgress * 10,
                  opacity:
                    stepProgress > 0.5 ? 1 - (stepProgress - 0.5) / 0.5 : 1,
                  scale: 1 - j * 0.03,
                });
                return;
              }

              const targetY = baseY - stepProgress * PEEK;
              const startScale = 1 - (j - currentStep) * 0.03;
              const endScale = 1 - (j - currentStep - 1) * 0.03;

              gsap.set(card, {
                y: targetY,
                scale: gsap.utils.interpolate(
                  startScale,
                  endScale,
                  stepProgress,
                ),
                rotate: cards[j].rotate,
                opacity: 1,
              });
            });
          },
        }),
      );

      ScrollTrigger.refresh();
    };

    timer = window.setTimeout(init, 150);

    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(init, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      triggers.forEach((t) => t.kill());
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
        className="h-screen flex flex-col items-center justify-center bg-[#efeeec] overflow-hidden"
      >
        {/* Pill label */}
        <p className="mb-20 text-sm md:text-xl font-medium">
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
              {/* Image */}
              <div className="w-[180px] h-[180px] rounded-[1.5rem] overflow-hidden mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex-shrink-0">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Title */}
              <h2 className="text-5xl md:text-[3.5rem] font-extrabold mb-4 tracking-tighter leading-none flex-shrink-0">
                {card.title}
              </h2>

              {/* Description */}
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
