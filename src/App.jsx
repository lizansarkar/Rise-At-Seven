import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function CustomCursor() {
  const dotRef = useRef(null)
  const outlineRef = useRef(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const outlinePositionRef = useRef({ x: 0, y: 0 })
  const requestRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (event) => {
      positionRef.current = { x: event.clientX, y: event.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(calc(${event.clientX}px - 50%), calc(${event.clientY}px - 50%))`
      }
    }

    const handleInteractiveEnter = () => {
      document.documentElement.classList.add('cursor-hover')
    }

    const handleInteractiveLeave = () => {
      document.documentElement.classList.remove('cursor-hover')
    }

    const interactiveEls = document.querySelectorAll('a, button, input, textarea, .hamburger')
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', handleInteractiveEnter)
      el.addEventListener('mouseleave', handleInteractiveLeave)
    })

    document.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      outlinePositionRef.current.x += (positionRef.current.x - outlinePositionRef.current.x) * 0.18
      outlinePositionRef.current.y += (positionRef.current.y - outlinePositionRef.current.y) * 0.18
      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate(calc(${outlinePositionRef.current.x}px - 50%), calc(${outlinePositionRef.current.y}px - 50%))`
      }
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', handleInteractiveEnter)
        el.removeEventListener('mouseleave', handleInteractiveLeave)
      })
      cancelAnimationFrame(requestRef.current)
    }
  }, [])

  return (
    <>
      <div ref={outlineRef} className="cursor-outline" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  )
}

function TextReveal({ text, className = '' }) {
  const textRef = useRef(null)

  useEffect(() => {
    if (!textRef.current) return

    const lines = textRef.current.querySelectorAll('.text-reveal-line')

    gsap.from(lines, {
      duration: 0.85,
      y: 100,
      opacity: 0,
      stagger: 0.12,
      ease: 'power4.out',
      delay: 0.2,
    })
  }, [])

  return (
    <div ref={textRef} className={`text-reveal ${className}`}>
      {text.split('\n').map((line, idx) => (
        <span key={idx} className="text-reveal-line">
          <span>{line}</span>
        </span>
      ))}
    </div>
  )
}

function Marquee({ items = [] }) {
  const contentRef = useRef(null)
  const displayItems = items.length > 0 ? items : Array(6).fill('Rise At Seven')

  return (
    <div className="marquee-container">
      <div ref={contentRef} className="marquee-content">
        {displayItems.map((item, idx) => (
          <span key={idx}>{item}</span>
        ))}
        {displayItems.map((item, idx) => (
          <span key={`duplicate-${idx}`}>{item}</span>
        ))}
      </div>
    </div>
  )
}

function HorizontalGallery() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const track = containerRef.current.querySelector('.gallery-track')

    const animation = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${track.scrollWidth}`,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      animation.kill()
    }
  }, [])

  const galleryItems = [
    { id: 1, title: 'Elegance' },
    { id: 2, title: 'Performance' },
    { id: 3, title: 'Innovation' },
    { id: 4, title: 'Design' },
    { id: 5, title: 'Future' },
  ]

  return (
    <section id="gallery" className="gallery-container" ref={containerRef}>
      <div className="gallery-track">
        {galleryItems.map((item) => (
          <div key={item.id} className="gallery-item">
            <div className="gallery-copy">
              <span className="gallery-label">Featured</span>
              <h2>{item.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Navbar({ menuOpen, setMenuOpen }) {
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return
      navRef.current.classList.toggle('nav-scrolled', window.scrollY > 40)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav ref={navRef} className="site-nav">
        <div className="nav-container">
          <div className="nav-logo">Rise</div>
          <ul className="nav-links">
            <li><a href="#hero">Home</a></li>
            <li><a href="#featured">Work</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#news">Journal</a></li>
          </ul>
          <button
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

function MobileMenu({ open, onClose }) {
  const menuRef = useRef(null)
  const linksRef = useRef([])

  useEffect(() => {
    if (!menuRef.current) return

    if (open) {
      document.body.style.overflow = 'hidden'
      gsap.to(menuRef.current, {
        left: 0,
        duration: 0.3,
        ease: 'power2.out',
      })

      linksRef.current.forEach((link, idx) => {
        if (!link) return
        gsap.from(link, {
          y: 50,
          opacity: 0,
          duration: 0.45,
          delay: idx * 0.08,
          ease: 'power3.out',
        })
      })
    } else {
      document.body.style.overflow = 'auto'
      gsap.to(menuRef.current, {
        left: '-100%',
        duration: 0.3,
        ease: 'power2.in',
      })
    }
  }, [open])

  const handleLinkClick = (e) => {
    e.preventDefault()
    onClose()
    const section = document.querySelector(e.currentTarget.getAttribute('href'))
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div ref={menuRef} className={`mobile-menu ${open ? 'active' : ''}`}>
      <ul>
        {['#hero', '#featured', '#services', '#news'].map((href, index) => (
          <li key={href} ref={(el) => (linksRef.current[index] = el)}>
            <a href={href} onClick={handleLinkClick}>
              {href === '#hero' ? 'Home' : href === '#featured' ? 'Work' : href === '#services' ? 'Services' : 'Journal'}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function HeroSection() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <div className="hero-copy">
          <span className="hero-label">Digital agency</span>
          <TextReveal text="We build smarter brands for ambitious teams" />
          <p>
            Crafting striking digital experiences with bold storytelling, smooth motion and technical precision.
          </p>
          <div className="hero-actions">
            <a href="#featured" className="cta-button">See our work</a>
            <button className="secondary-button">Start a project</button>
          </div>
          <div className="hero-brandline">
            <span>Brand identity</span>
            <span>Web design</span>
            <span>Motion</span>
            <strong>Trusted by ambitious teams</strong>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-card visual-card--one"></div>
          <div className="visual-card visual-card--two"></div>
        </div>
      </div>
    </section>
  )
}

function FeaturedSection() {
  return (
    <section id="featured" className="featured-section">
      <div className="featured-grid">
        <div className="featured-copy">
          <span className="featured-label">Featured work</span>
          <h2>Design that makes brands feel alive.</h2>
          <p>
            Combining strategy, motion and craft to deliver standout digital experiences for bold businesses.
          </p>
          <div className="featured-list">
            <div className="featured-item">
              <p className="project-meta">Strategy / Product</p>
              <h3 className="project-title">Aperture</h3>
            </div>
            <div className="featured-item">
              <p className="project-meta">Brand / Web</p>
              <h3 className="project-title">Muse</h3>
            </div>
            <div className="featured-item">
              <p className="project-meta">Campaign / Motion</p>
              <h3 className="project-title">Nova</h3>
            </div>
          </div>
        </div>
        <div className="featured-cards">
          <article className="featured-card">
            <span className="card-label">Case study</span>
            <h3>Motion-led product launch</h3>
            <p>Animated storytelling and responsive design for a premium SaaS experience.</p>
          </article>
          <article className="featured-card">
            <span className="card-label">Case study</span>
            <h3>Brand refresh for a creative studio</h3>
            <p>Bold typography, layered visuals and a website built for rapid growth.</p>
          </article>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const services = [
    {
      title: 'Brand systems',
      description: 'Strategic identity, tone and visual direction for ambitious teams.',
    },
    {
      title: 'Digital products',
      description: 'Interfaces built for clarity, speed and emotional impact.',
    },
    {
      title: 'Motion design',
      description: 'Subtle motion and cinematic transitions that elevate every interaction.',
    },
    {
      title: 'Creative campaigns',
      description: 'Narrative-led launches and digital journeys designed to stand out.',
    },
  ]

  return (
    <section id="services" className="services-section">
      <div className="services-top">
        <h2>Services built for ambitious brands.</h2>
        <button className="services-cta">View all services</button>
      </div>
      <div className="service-list">
        {services.map((service) => (
          <article key={service.title} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function StackSection() {
  return (
    <section className="stack-section">
      <div className="stack-grid">
        <div className="stack-copy">
          <span className="featured-label">Creative partners</span>
          <h2>We work with modern teams to shape meaningful experiences.</h2>
          <p>
            From launch to long-term growth, every project is built with clarity, emotion and scale in mind.
          </p>
        </div>
        <div className="stack-cards">
          <article className="stack-card">
            <h3>Product storytelling</h3>
            <p>Launch-ready content and motion designed to help teams convert with confidence.</p>
          </article>
          <article className="stack-card">
            <h3>Design systems</h3>
            <p>Flexible brand systems that stay consistent across web, motion and campaign touchpoints.</p>
          </article>
          <article className="stack-card">
            <h3>Customer journeys</h3>
            <p>Meaningful digital experiences that feel premium and perform under pressure.</p>
          </article>
        </div>
      </div>
    </section>
  )
}

function NewsSection() {
  const posts = [
    {
      title: 'How motion empowers product storytelling',
      tag: 'Motion',
      meta: '4 min read',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Why brand systems matter in digital growth',
      tag: 'Brand',
      meta: '5 min read',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Designing with impact for ambitious startups',
      tag: 'Design',
      meta: '3 min read',
      image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da4?auto=format&fit=crop&w=1200&q=80',
    },
  ]

  return (
    <section id="news" className="news-section">
      <div className="news-grid">
        {posts.map((post) => (
          <article key={post.title} className="news-card">
            <div className="news-card__image" style={{ backgroundImage: `url(${post.image})` }} />
            <div className="news-card__content">
              <span className="news-card__tag">{post.tag}</span>
              <h3 className="news-card__title">{post.title}</h3>
              <div className="news-card__meta">{post.meta}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <h3 className="footer-title">Rise At Seven</h3>
          <p>Creating high-end digital work for ambitious brands and fast-growing teams.</p>
        </div>
        <div className="footer-links">
          <a href="#hero">Home</a>
          <a href="#featured">Work</a>
          <a href="#services">Services</a>
          <a href="#news">Journal</a>
        </div>
        <div className="footer-links">
          <a href="#">Careers</a>
          <a href="#">Contact</a>
          <a href="#">Privacy</a>
        </div>
        <div className="newsletter-card">
          <span className="featured-label">Stay in the loop</span>
          <input className="newsletter-input" type="email" placeholder="Email address" />
        </div>
      </div>
      <div className="footer-copy">
        <span>© 2024 Rise At Seven</span>
        <span>Designed with care, built for speed.</span>
      </div>
    </footer>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      smoothTouch: false,
      normalizeWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    const onScroll = () => {
      ScrollTrigger.update()
      document.documentElement.classList.add('lenis-scrolling')
      clearTimeout(window.lenisScrollTimeout)
      window.lenisScrollTimeout = setTimeout(() => {
        document.documentElement.classList.remove('lenis-scrolling')
      }, 150)
    }

    lenis.on('scroll', onScroll)

    return () => {
      lenis.off('scroll', onScroll)
      lenis.destroy()
      clearTimeout(window.lenisScrollTimeout)
    }
  }, [])

  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <CustomCursor />
      <main className="overflow-x-hidden">
        <HeroSection />
        <Marquee items={['Rise At Seven', 'Premium Design', 'Smooth Scroll', 'Creative Strategy']} />
        <HorizontalGallery />
        <FeaturedSection />
        <ServicesSection />
        <StackSection />
        <NewsSection />
        <Footer />
      </main>
    </>
  )
}

export default App
