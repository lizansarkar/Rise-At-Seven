import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
// Font Awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // নতুন স্টেট: স্ক্রল করলে স্টাইল চেঞ্জ করার জন্য
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();

  // Scroll logic
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (latest > previous && latest > 100) {
      setHidden(true);
      setIsOpen(false);
    } else {
      setHidden(false);
    }

    if (latest > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const navLinks = [
    { name: "Services +", link: "#" },
    { name: "International +", link: "#" },
    { name: "About +", link: "#" },
    { name: "Work", link: "#", badge: "25" },
    { name: "Careers", link: "#" },
    { name: "Blog", link: "#" },
    { name: "Webinar", link: "#" },
  ];

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-150%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-13 inset-x-0 z-[100] mx-auto"
    >
      <div
        className={`
          flex items-center justify-between px-4 md:px-8 py-3 rounded-full transition-all duration-500 ease-in-out
          ${
            isScrolled
              ? "backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] bg-accent/50 text-neutral"
              : "bg-transparent border-transparent shadow-none"
          }
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center cursor-pointer">
          <h1
            className={`text-xl md:text-2xl font-bold tracking-tighter transition-colors duration-500 ${isScrolled ? "text-neutral" : "text-accent"}`}
          >
            Rise at Seven<span className="text-[10px] align-top">®</span>
          </h1>
        </div>

        {/* Desktop Links */}
        <div
          className={`hidden lg:flex items-center gap-8 ${isScrolled ? "text-neutral" : "text-accent"}`}
        >
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.link}
              className="text-[13px] font-bold hover:opacity-60 transition-all relative group uppercase tracking-wide"
            >
              {link.name}
              {link.badge && (
                <span className="absolute -top-3 -right-5 bg-[#b2f6e3] text-[9px] font-bold px-1.5 py-0.5 rounded-full text-black border border-white">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </div>

        {/* Right Side: CTA Button & Hamburger */}
        <div className="flex items-center gap-3">
          <button className="btn-sweep !text-black !px-6 !py-2.5 !text-sm !font-bold active:scale-95">
            <div className="sweep-text">
              <span className="flex items-center gap-2">
                Get In Touch
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="text-[10px]"
                />
              </span>

              <span className="flex items-center gap-2">
                Get In Touch
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="text-[10px]"
                />
              </span>
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center text-[#111212] cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FontAwesomeIcon icon={isOpen ? faXmark : faBars} size="lg" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute top-20 inset-x-0 bg-white border border-gray-100 rounded-[2rem] p-8 shadow-2xl lg:hidden flex flex-col gap-5 mx-2"
        >
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.link}
              className="text-xl font-black text-[#111212] flex justify-between items-center border-b border-gray-50 pb-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
              {link.badge && (
                <span className="bg-[#b2f6e3] text-[10px] px-2 py-1 rounded-full border border-white shadow-sm">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
