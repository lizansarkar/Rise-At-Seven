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
      desc: "We're dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search with Digital PR, and Social Search and we will continue to do it.",
      bg: "#0d0d0d",
      textColor: "#ffffff",
      rotate: 4,
      img: "https://rise-atseven.transforms.svdcdn.com/production/images/b2087e0cd3f699d3efc76f809ec72a85a6ab378e-1080x1350.jpg?w=800&h=800&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5",
    },
    {
      id: 2,
      title: "Award Winning",
      desc: "A roll top bath full of 79 awards. Voted The Drum's best agency outside of London. We are official judges for industry awards including Global Search Awards and Global Content Marketing Awards.",
      bg: "#b8ffd9",
      textColor: "#0d0d0d",
      rotate: -4,
      img: "https://rise-atseven.transforms.svdcdn.com/production/images/IMG_5023.jpg?w=800",
    },
    {
      id: 3,
      title: "Speed",
      desc: "Ever heard the saying Early Bird catches the worm? Google is moving fast, but humans are moving faster. We chase consumers, not algorithms. We've created a service which takes ideas to result within 60 minutes.",
      bg: "#ffffff",
      textColor: "#0d0d0d",
      rotate: 6,
      img: "https://rise-atseven.transforms.svdcdn.com/production/images/Screenshot-2025-06-23-at-23.15.19.png?w=800&h=800&q=80&fm=webp&fit=crop",
    },
  ];

  useEffect(() => {
    const cards_el = cardsRef.current;
    const total = cards.length;

    ScrollTrigger.getAll().forEach((t) => t.kill());

    // Initial state: stack with slight downward offset so you can see cards peeking
    cards_el.forEach((card, i) => {
      const stackOffset = (total - 1 - i) * 16;
      gsap.set(card, {
        y: stackOffset,
        rotate: cards[i].rotate,
        zIndex: i + 1,
        transformOrigin: "50% 100%",
      });
    });

    // Pin the sticky wrapper across all card steps
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${(total - 1) * window.innerHeight}px`,
      pin: wrapperRef.current,
      pinSpacing: true,
      anticipatePin: 1,
    });

    // Per-card scroll step: card flies off, cards below rise up
    cards_el.forEach((card, i) => {
      if (i === total - 1) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: `+=${i * window.innerHeight}px`,
        end: `+=${(i + 1) * window.innerHeight}px`,
        scrub: 1,
        onUpdate(self) {
          const p = self.progress;

          // Top card flies up and rotates slightly
          gsap.set(card, {
            y: -p * window.innerHeight * 0.95,
            rotate: cards[i].rotate - p * 6,
            opacity: p > 0.7 ? 1 - (p - 0.7) / 0.3 : 1,
          });

          // Cards below rise to fill the stack
          for (let j = i + 1; j < total; j++) {
            const depth = j - i - 1;
            const targetOffset = (total - 1 - j) * 16;
            const fromOffset = targetOffset + (depth + 1) * 16;
            gsap.set(cards_el[j], {
              y: gsap.utils.interpolate(fromOffset, targetOffset, p),
              rotate: gsap.utils.interpolate(
                cards[j].rotate * 1.25,
                cards[j].rotate,
                p
              ),
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
      style={{ height: `${cards.length * 100}vh`, background: "#eeece6" }}
    >
      {/* Sticky viewport — pinned by GSAP */}
      <div
        ref={wrapperRef}
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#eeece6",
        }}
      >
        {/* Top pill label */}
        <p
          style={{
            marginBottom: "2rem",
            fontSize: "0.72rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#555",
            border: "1px solid #bbb",
            borderRadius: "999px",
            padding: "6px 20px",
          }}
        >
          Legacy In The Making
        </p>

        {/* Card stack */}
        <div
          style={{
            position: "relative",
            width: "min(400px, 90vw)",
            height: "560px",
          }}
        >
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => (cardsRef.current[index] = el)}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "2rem",
                padding: "2rem 2rem 2.5rem",
                background: card.bg,
                color: card.textColor,
                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                textAlign: "center",
                willChange: "transform, opacity",
                overflow: "hidden",
              }}
            >
              {/* Small image top — like screenshot */}
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  borderRadius: "1.25rem",
                  overflow: "hidden",
                  marginBottom: "1.5rem",
                  flexShrink: 0,
                }}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Title — big and bold */}
              <h2
                style={{
                  fontSize: "clamp(2.2rem, 7vw, 3.2rem)",
                  fontWeight: 800,
                  marginBottom: "0.6rem",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              >
                {card.title}
              </h2>

              {/* Desc */}
              <p
                style={{
                  fontSize: "0.82rem",
                  lineHeight: 1.7,
                  opacity: 0.78,
                  maxWidth: "300px",
                  marginBottom: "auto",
                }}
              >
                {card.desc}
              </p>

              {/* Button */}
              <button
                style={{
                  marginTop: "1.5rem",
                  padding: "10px 28px",
                  border: `1.5px solid ${card.textColor}`,
                  borderRadius: "999px",
                  background: "transparent",
                  color: card.textColor,
                  fontSize: "0.72rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                Read More
              </button>
            </div>
          ))}
        </div>

        {/* Scroll indicator — icon only */}
        <div
          style={{
            marginTop: "2rem",
            opacity: 0.4,
          }}
        >
          <svg width="22" height="34" viewBox="0 0 22 34" fill="none">
            <rect
              x="1"
              y="1"
              width="20"
              height="32"
              rx="10"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <rect
              x="9"
              y="6"
              width="4"
              height="7"
              rx="2"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StackSection;