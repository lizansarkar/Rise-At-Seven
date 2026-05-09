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
      desc: "We're dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search with Digital PR, and Social Search and we will continue to do it. We're on a mission to be the first search-first agency to win a Cannes Lion disrupting the status quo.",
      bg: "#0d0d0d",
      textColor: "#ffffff",
      rotate: 0, // প্রথম কার্ড সোজা থাকবে
      img: "https://rise-atseven.transforms.svdcdn.com/production/images/b2087e0cd3f699d3efc76f809ec72a85a6ab378e-1080x1350.jpg?w=800&h=800&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5",
    },
    {
      id: 2,
      title: "Award Winning",
      desc: "A roll top bath full of 79 awards. Voted The Drum's best agency outside of London. We are official judges for industry awards including Global Search Awards and Global Content Marketing Awards.",
      bg: "#b8ffd9",
      textColor: "#0d0d0d",
      rotate: 6, // বামে হালকা বাঁকানো
      img: "https://rise-atseven.transforms.svdcdn.com/production/images/IMG_5023.jpg?w=800",
    },
    {
      id: 3,
      title: "Speed",
      desc: "Ever heard the saying Early Bird catches the worm? Google is moving fast, but humans are moving faster. We chase consumers, not algorithms. We've created a service which takes ideas to result within 60 minutes.",
      bg: "#ffffff",
      textColor: "#0d0d0d",
      rotate: 12, // ডানে হালকা বাঁকানো
      img: "https://rise-atseven.transforms.svdcdn.com/production/images/Screenshot-2025-06-23-at-23.15.19.png?w=800&h=800&q=80&fm=webp&fit=crop",
    },
  ];

  // PEEK মান কমিয়ে আপনার ইমেজের মতো স্ট্যাক লুক দেওয়া হয়েছে
  const PEEK = 12; 

  useEffect(() => {
    const cards_el = cardsRef.current;
    const total = cards.length;

    ScrollTrigger.getAll().forEach((t) => t.kill());

    // কার্ডগুলোর শুরুর পজিশন সেট করা (নিখুঁত স্ট্যাকিংয়ের জন্য)
    cards_el.forEach((card, i) => {
      gsap.set(card, {
        y: i * PEEK,
        x: 0,
        rotate: cards[i].rotate,
        zIndex: total - i,
        scale: 1 - i * 0.03, // পেছনের কার্ডগুলো হালকা ছোট দেখাবে (Depth Effect)
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

          // বর্তমান কার্ডটি উপরের দিকে উড়ে যাবে
          gsap.set(card, {
            y: -p * window.innerHeight * 1.2,
            rotate: cards[i].rotate - p * 10,
            opacity: p > 0.5 ? 1 - (p - 0.5) / 0.5 : 1,
          });

          // নিচের কার্ডগুলো ধীরে ধীরে সামনে আসবে এবং সোজা হবে
          for (let j = i + 1; j < total; j++) {
            const slotsBelow = j - (i + 1);
            const currentY = gsap.getProperty(cards_el[j], "y");
            const targetY = slotsBelow * PEEK;
            
            gsap.to(cards_el[j], {
              y: targetY,
              rotate: gsap.utils.interpolate(cards[j].rotate, 0, p),
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
    <div ref={containerRef} style={{ height: `${cards.length * 100}vh`, background: "#efeeec" }}>
      <div ref={wrapperRef} style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#efeeec", overflow: "hidden" }}>
        
        {/* Pill label */}
        <p style={{ marginBottom: "3rem", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#333", border: "1px solid #ccc", borderRadius: "999px", padding: "8px 24px", fontWeight: "600" }}>
          Legacy In The Making
        </p>

        {/* Card stack container */}
        <div style={{ position: "relative", width: "420px", height: "580px" }}>
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => (cardsRef.current[index] = el)}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "2.5rem", // আপনার ইমেজের মতো রাউন্ডেড কর্নার
                background: card.bg,
                color: card.textColor,
                boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "2.5rem 2rem",
                willChange: "transform, opacity",
              }}
            >
              {/* Centered Image Area */}
              <div style={{ width: "180px", height: "180px", borderRadius: "1.5rem", overflow: "hidden", marginBottom: "2rem", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
                <img src={card.img} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>

              <h2 style={{ fontSize: "3.5rem", fontWeight: "800", marginBottom: "1rem", letterSpacing: "-0.04em", lineHeight: "1" }}>
                {card.title}
              </h2>

              <p style={{ fontSize: "0.9rem", lineHeight: "1.6", opacity: 0.8, maxWidth: "320px", marginBottom: "2rem" }}>
                {card.desc}
              </p>

              <button style={{ padding: "12px 35px", border: `2px solid ${card.textColor}`, borderRadius: "999px", background: "transparent", color: card.textColor, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", fontWeight: "700", transition: "all 0.3s" }}>
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StackSection;