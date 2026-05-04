import TextReveal from './TextReveal'

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

export default HeroSection