import { useRef } from 'react'

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

export default Marquee