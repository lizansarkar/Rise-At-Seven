import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function FeaturedSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const cards = sectionRef.current.querySelectorAll('.featured-card')

    cards.forEach((card, index) => {
      gsap.from(card, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const featuredProjects = [
    {
      id: 1,
      title: 'Brand Identity',
      description: 'Crafting memorable brand identities that resonate with audiences.',
      image: '/api/placeholder/600/400',
    },
    {
      id: 2,
      title: 'Web Design',
      description: 'Creating stunning websites that drive results.',
      image: '/api/placeholder/600/400',
    },
    {
      id: 3,
      title: 'Motion Graphics',
      description: 'Bringing stories to life with captivating animations.',
      image: '/api/placeholder/600/400',
    },
  ]

  return (
    <section id="featured" className="featured-section" ref={sectionRef}>
      <div className="featured-container">
        <div className="featured-header">
          <span className="section-label">Featured work</span>
          <h2>Our latest projects</h2>
          <p>Discover our portfolio of innovative digital solutions.</p>
        </div>
        <div className="featured-grid">
          {featuredProjects.map((project) => (
            <div key={project.id} className="featured-card">
              <div className="card-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="card-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href="#" className="card-link">View project</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedSection