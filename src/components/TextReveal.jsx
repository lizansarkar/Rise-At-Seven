import { useRef, useEffect } from 'react'
import gsap from 'gsap'

function TextReveal({ text, className = '' }) {
  const textRef = useRef(null)

  useEffect(() => {
    if (!textRef.current) return

    const lines = textRef.current.querySelectorAll('.text-reveal-line')

    gsap.from(lines, {
      duration: 0.85,
      y: 100,
      opacity: 0,
      stagger: 0.12,
      ease: 'power4.out',
      delay: 0.2,
    })
  }, [])

  return (
    <div ref={textRef} className={`text-reveal ${className}`}>
      {text.split('\n').map((line, idx) => (
        <span key={idx} className="text-reveal-line">
          <span>{line}</span>
        </span>
      ))}
    </div>
  )
}

export default TextReveal