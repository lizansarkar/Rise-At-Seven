import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function NewsSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const newsItems = sectionRef.current.querySelectorAll('.news-item')

    gsap.from(newsItems, {
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

  const newsItems = [
    {
      id: 1,
      title: 'The Future of Web Design',
      excerpt: 'Exploring emerging trends in modern web design.',
      date: '2024-01-15',
    },
    {
      id: 2,
      title: 'Brand Storytelling',
      excerpt: 'How to create compelling narratives for your brand.',
      date: '2024-01-10',
    },
    {
      id: 3,
      title: 'Motion Design Principles',
      excerpt: 'Essential principles for creating effective motion graphics.',
      date: '2024-01-05',
    },
  ]

  return (
    <section id="news" className="news-section" ref={sectionRef}>
      <div className="news-container">
        <div className="news-header">
          <span className="section-label">Latest news</span>
          <h2>From our journal</h2>
          <p>Stay updated with our latest insights and industry trends.</p>
        </div>
        <div className="news-grid">
          {newsItems.map((item) => (
            <article key={item.id} className="news-item">
              <div className="news-meta">
                <time dateTime={item.date}>{new Date(item.date).toLocaleDateString()}</time>
              </div>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
              <a href="#" className="news-link">Read more</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsSection