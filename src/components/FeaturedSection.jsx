import React from 'react'

function FeaturedSection() {
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
    <section id="featured" className="featured-section">
      <div className="featured-container">
        <div className="featured-header">
          <span className="section-label">Featured work</span>
          <h2>Our latest projects</h2>
          <p>Discover our portfolio of innovative digital solutions.</p>
        </div>
        <div className="featured-grid">
          {featuredProjects.map((project) => (
            <div key={project.id} className="featured-card custom-cursor-target">
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