import { useRef } from "react";
import { gsap } from "gsap";

function FlowingMenu({ items = [] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 mt-8">
      {items.map((item, idx) => (
        <MenuItem
          key={idx}
          {...item}
          isFirst={idx < 2}
          isLast={idx >= items.length - 2}
        />
      ))}
    </div>
  );
}

function MenuItem({ text, image, link, isFirst, isLast }) {
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const arrowRef = useRef(null);

  const handleEnter = () => {
    gsap.to(imageRef.current, {
      opacity: 1,
      scale: 1.08,
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.to(overlayRef.current, {
      opacity: 0.15,
      duration: 0.4,
    });

    gsap.to(textRef.current, {
      color: "#ffffff",
      x: 10,
      duration: 0.4,
    });

    gsap.to(arrowRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
    });
  };

  const handleLeave = () => {
    gsap.to(imageRef.current, {
      opacity: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
    });

    gsap.to(textRef.current, {
      color: "#1e1f1f",
      x: 0,
      duration: 0.3,
    });

    gsap.to(arrowRef.current, {
      opacity: 0,
      y: 12,
      duration: 0.3,
    });
  };

  return (
    <div
      className={`
        relative overflow-hidden
        ${!isFirst ? "border-t border-black/15" : ""}
        ${!isLast ? "border-b border-black/15" : ""}
      `}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <a
        href={link}
        className="
          relative
          flex
          items-center
          h-[120px]
          md:h-[140px]
          px-6
          md:px-10
          rounded-full
          overflow-hidden
          group
        "
      >
        {/* Background Image */}
        <div
          ref={imageRef}
          className="
            absolute
            inset-0
            opacity-0
            scale-100
          "
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Dark Overlay */}
        <div
          ref={overlayRef}
          className="
            absolute
            inset-0
            bg-black
            opacity-0
          "
        />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-between w-full">
          <h3
            ref={textRef}
            className="
              text-[34px]
              md:text-[52px]
              font-bold
              tracking-[-0.04em]
              leading-none
              transition-colors
            "
          >
            {text}
          </h3>

          <span
            ref={arrowRef}
            className="
              text-white
              text-4xl
              opacity-0
              translate-y-3
            "
          >
            ↗
          </span>
        </div>
      </a>
    </div>
  );
}

export default FlowingMenu;