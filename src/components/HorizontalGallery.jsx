import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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

export default HorizontalGallery