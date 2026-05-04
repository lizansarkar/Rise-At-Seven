import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function StackSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const stackItems = sectionRef.current.querySelectorAll('.stack-item')

    gsap.from(stackItems, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const techStack = [
    { name: 'React', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Figma', category: 'Design' },
    { name: 'GSAP', category: 'Animation' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'MongoDB', category: 'Database' },
  ]

  return (
    <section id="stack" className="stack-section" ref={sectionRef}>
      <div className="stack-container">
        <div className="stack-header">
          <span className="section-label">Tech stack</span>
          <h2>Tools we use</h2>
          <p>We leverage cutting-edge technologies to deliver exceptional results.</p>
        </div>
        <div className="stack-grid">
          {techStack.map((tech, index) => (
            <div key={index} className="stack-item">
              <span className="stack-category">{tech.category}</span>
              <h3>{tech.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StackSection