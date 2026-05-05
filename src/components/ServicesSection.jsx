import React from 'react'

function ServicesSection() {
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
    <section id="services" className="services-section">
      <div className="services-container">
        <div className="services-header">
          <span className="section-label">Our services</span>
          <h2>What we do</h2>
          <p>We offer a full range of digital services to help your brand succeed.</p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-item custom-cursor-target">
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