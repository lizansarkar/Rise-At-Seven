import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./App.css";
// import CustomCursor from "./components/CustomCursor";
// import TextReveal from "./components/TextReveal";
import MarqueeSection from "./components/MarqueeSection";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturedSection from "./components/FeaturedSection";
import ServicesSection from "./components/ServicesSection";
import StackSection from "./components/StackSection";
import NewsSection from "./components/NewsSection";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
import OurStory from "./components/OurStory";
import ScrollingMarquee from "./components/ScrollingMarquee";
import WaveMarquee from "./components/WaveMarquee";

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

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    ScrollTrigger.defaults({ scroller: document.body });
    gsap.ticker.lagSmoothing(0);

    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };

    const onScroll = () => {
      ScrollTrigger.update();
      document.documentElement.classList.add("lenis-scrolling");
      clearTimeout(window.lenisScrollTimeout);
      window.lenisScrollTimeout = setTimeout(() => {
        document.documentElement.classList.remove("lenis-scrolling");
      }, 150);
    };

    const onRefresh = () => {
      lenis.raf(performance.now());
    };

    gsap.ticker.add(rafCallback);
    lenis.on("scroll", onScroll);
    ScrollTrigger.addEventListener("refresh", onRefresh);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.off("scroll", onScroll);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      lenis.destroy();
      clearTimeout(window.lenisScrollTimeout);
    };
  }, []);

  return (
    <>
      <TopBar></TopBar>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {/* <CustomCursor /> */}
      <main className="overflow-x-hidden">
        <HeroSection />
        <MarqueeSection />
        <OurStory />
        <FeaturedSection />
        <ServicesSection />
        <ScrollingMarquee></ScrollingMarquee>
        <StackSection />
        <NewsSection />
        <WaveMarquee></WaveMarquee>
        <Footer />
      </main>
    </>
  );
}

export default App;
