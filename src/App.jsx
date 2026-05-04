import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./App.css";
import CustomCursor from "./components/CustomCursor";
import TextReveal from "./components/TextReveal";
import Marquee from "./components/Marquee";
import HorizontalGallery from "./components/HorizontalGallery";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturedSection from "./components/FeaturedSection";
import ServicesSection from "./components/ServicesSection";
import StackSection from "./components/StackSection";
import NewsSection from "./components/NewsSection";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: "vertical",
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      smoothTouch: false,
      normalizeWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const onScroll = () => {
      ScrollTrigger.update();
      document.documentElement.classList.add("lenis-scrolling");
      clearTimeout(window.lenisScrollTimeout);
      window.lenisScrollTimeout = setTimeout(() => {
        document.documentElement.classList.remove("lenis-scrolling");
      }, 150);
    };

    lenis.on("scroll", onScroll);

    return () => {
      lenis.off("scroll", onScroll);
      lenis.destroy();
      clearTimeout(window.lenisScrollTimeout);
    };
  }, []);

  return (
    <>
      <TopBar></TopBar>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <CustomCursor />
      <main className="overflow-x-hidden">
        <HeroSection />
        <Marquee
          items={[
            "Rise At Seven",
            "Premium Design",
            "Smooth Scroll",
            "Creative Strategy",
          ]}
        />
        <HorizontalGallery />
        <FeaturedSection />
        <ServicesSection />
        <StackSection />
        <NewsSection />
        <Footer />
      </main>
    </>
  );
}

export default App;
