import React from 'react';
import { motion } from 'framer-motion';
import heroImg from "../assets/Emirates-airpline-in-flight.webp";

const OurStory = () => {
  // Pure SVG Arrow
  const ArrowIcon = () => (
    <svg 
      width="14" 
      height="14" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="ml-1"
    >
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  );

  // Reusable Sweep Button
  const SweepButton = ({ text, isPrimary = false }) => (
    <button 
      className={`btn-sweep ${!isPrimary ? 'bg-transparent hover:bg-black' : ''}`}
      style={{ cursor: 'pointer' }}
    >
      <div className="sweep-text">
        <span className="flex flex-col">
          <em className="not-italic flex items-center font-medium">
            {text} <ArrowIcon />
          </em>
          <em className="not-italic flex items-center font-medium text-white">
            {text} <ArrowIcon />
          </em>
        </span>
      </div>
    </button>
  );

  return (
    <section className="w-full bg-[#eeeeee] py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Container removed max-w to ensure true full width */}
      <div className="w-full flex flex-col lg:flex-row items-start justify-between">
        
        {/* Left Side: Description (Flexible and Wide) */}
        <div className="lg:flex-1 pr-10">
          <p className="text-neutral inline-flex flex-wrap text-balance relative   text-left justify-start text-grey-900 text-lg/tight | lg:text-lg/tight | xl:text-2xl/none | 4xl:text-3xl/none font-sans-primary font-medium tracking-tight js-heading">
            A global team of search-first content marketers engineering semantic relevancy & category signals for both the internet and people
          </p>
        </div>

        {/* Right Side: Giant Heading & Buttons */}
<div className="lg:flex-[1.5] flex flex-col items-start lg:items-end mt-10 lg:mt-0 w-full">
  {/* items-end ব্যবহার করায় পুরো কন্টেন্ট ব্লকটি ডান দিকে চলে যাবে */}
  
  <div className="flex flex-col items-start"> 
    {/* এখানে items-start রাখায় ভেতরের টেক্সট এবং বাটন বাম দিক থেকেই শুরু হবে */}
    
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-[30px] md:text-[50px] lg:text-[100px] font-bold text-black tracking-tighter leading-[0.85] text-left"
    >
      Driving Demand & <br /> 
      <span className="inline-flex items-center">
        Discovery
        <div className="w-16 h-12 md:w-36 md:h-28 rounded-[2rem] md:rounded-[3rem] overflow-hidden border-2 border-white inline-block shadow-2xl mx-4 rotate-[-2deg]">
          <img
            src={heroImg}
            alt="Discovery"
            className="w-full h-full object-cover scale-110"
          />
        </div>
      </span>
    </motion.h2>

    {/* Buttons Layout - এখন এটিও টেক্সটের সাথে এলাইন হয়ে থাকবে */}
    <div className="mt-12 flex items-center gap-6">
      <SweepButton text="Our Story" isPrimary={true} />
      <SweepButton text="Our Services" isPrimary={false} />
    </div>
  </div>
</div>

      </div>
    </section>
  );
};

export default OurStory;