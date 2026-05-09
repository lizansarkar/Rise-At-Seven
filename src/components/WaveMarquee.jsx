import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WaveMarquee = () => {
  const marqueeContainerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;

    // ১. টেক্সটটি ডান থেকে বামে এবং বাম থেকে ডানে স্লাইড করার অ্যানিমেশন
    const marqueeTween = gsap.to(textElement, {
      xPercent: -50, // টেক্সটটিকে অর্ধেক স্লাইড করাবে
      ease: "none",
      scrollTrigger: {
        trigger: marqueeContainerRef.current,
        start: "top bottom", // যখন সেকশনটি স্ক্রিনের নিচে দেখা যাবে
        end: "bottom top",    // যখন সেকশনটি স্ক্রিন পার হয়ে উপরে যাবে
        scrub: 1,            // স্ক্রল অনুযায়ী স্মুথ মুভমেন্ট
      },
    });

    // ২. কার্ভ বা বাঁকা ইফেক্টের জন্য জ্যামিতিক অ্যানিমেশন (Skew বা Rotate)
    gsap.fromTo(
      textElement,
      { skewX: 10, rotate: 5 },
      {
        skewX: -10,
        rotate: -5,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: marqueeContainerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    return () => {
      // ক্লিনআপ
      marqueeTween.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={marqueeContainerRef}
      className="relative w-full h-[60vh] flex items-center justify-center bg-[#efeeec] overflow-hidden select-none"
    >
      <div
        ref={textRef}
        className="flex whitespace-nowrap will-change-transform"
      >
        {/* বড় বড় ফন্টে একই টেক্সট কয়েকবার রিপিট করছি যাতে গ্যাপ না থাকে */}
        <h1 className="text-[12rem] md:text-[20rem] font-bold tracking-tighter leading-none flex items-center">
          Ready to Rise <span className="mx-10 md:mx-20">★</span> 
          Ready to Rise <span className="mx-10 md:mx-20">★</span>
          Ready to Rise <span className="mx-10 md:mx-20">★</span>
        </h1>
      </div>

      {/* ঐচ্ছিক: টেক্সট এর পেছনে হালকা শ্যাডো বা ওভারলে দিতে চাইলে */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#efeeec] via-transparent to-[#efeeec] opacity-30 z-10" />
    </section>
  );
};

export default WaveMarquee;