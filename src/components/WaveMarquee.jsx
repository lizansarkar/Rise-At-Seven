import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WaveMarquee = () => {
  const svgRef = useRef(null);
  const textPathRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // স্ক্রল করার সাথে সাথে টেক্সট পাথ এর startOffset পরিবর্তন হবে
    // এটি টেক্সটকে ঢেউয়ের মতো পথের ওপর দিয়ে টেনে নিয়ে যাবে
    gsap.to(textPathRef.current, {
      attr: { startOffset: "-100%" }, // ডান থেকে বামে মুভমেন্ট
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5, // আরও স্মুথ মুভমেন্টের জন্য ১.৫ ব্যবহার করা হয়েছে
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[80vh] bg-[#efeeec] flex items-center justify-center overflow-hidden"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1000 400"
        className="w-[150%] md:w-[120%] h-auto overflow-visible select-none fill-current text-black"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* এখানে আমরা সেই 'ঢেউ' বা কার্ভ পাথটি ডিফাইন করছি */}
          <path
            id="wavePath"
            d="M0,200 C200,200 400,100 600,100 C800,100 1000,300 1200,300"
            fill="transparent"
          />
        </defs>

        <text className="text-[80px] font-bold tracking-tighter uppercase">
          <textPath
            ref={textPathRef}
            xlinkHref="#wavePath"
            startOffset="100%" // শুরুতে টেক্সটটি ডানপাশে স্ক্রিনের বাইরে থাকবে
          >
            Ready to Rise ★ Ready to Rise ★ Ready to Rise ★ Ready to Rise ★
          </textPath>
        </text>
      </svg>

      {/* দুই পাশে হালকা ফেড ইফেক্ট যাতে টেক্সটগুলো হুট করে গায়েব না হয় */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#efeeec] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#efeeec] to-transparent z-10" />
    </section>
  );
};

export default WaveMarquee;