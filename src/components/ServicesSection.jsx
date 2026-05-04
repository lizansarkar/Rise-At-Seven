import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ServicesSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const items = sectionRef.current.querySelectorAll('.service-item')

    items.forEach((item, index) => {
      gsap.from(item, {
        x: index % 2 === 0 ? -100 : 100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const services = [
    {
      id: 1,
      title: 'Brand Strategy',
      description: 'Developing comprehensive brand strategies that align with your business goals.',
    },
    {
      id: 2,
      title: 'Digital Design',
      description: 'Creating visually stunning digital experiences that engage users.',
    },
    {
      id: 3,
      title: 'Web Development',
      description: 'Building robust, scalable websites and web applications.',
    },
    {
      id: 4,
      title: 'Motion Design',
      description: 'Crafting compelling animations and motion graphics.',
    },
  ]

  return (
    <section id="services" className="services-section" ref={sectionRef}>
      <div className="services-container">
        <div className="services-header">
          <span className="section-label">Our services</span>
          <h2>What we do</h2>
          <p>We offer a full range of digital services to help your brand succeed.</p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-item">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="#" className="service-link">Learn more</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection