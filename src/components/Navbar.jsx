import { useRef, useEffect } from 'react'
import gsap from 'gsap'

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

export default Navbar