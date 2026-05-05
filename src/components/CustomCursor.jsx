import { useRef, useEffect } from 'react'

function CustomCursor() {
  const dotRef = useRef(null)
  const outlineRef = useRef(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const outlinePositionRef = useRef({ x: 0, y: 0 })
  const requestRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (event) => {
      positionRef.current = { x: event.clientX, y: event.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = event.clientX + 'px'
        dotRef.current.style.top = event.clientY + 'px'
      }
    }

    const handleMouseEnter = (event) => {
      if (event.target.closest('.custom-cursor-target')) {
        document.documentElement.classList.add('cursor-active')
      }
    }

    const handleMouseLeave = (event) => {
      if (!event.target.closest('.custom-cursor-target')) {
        document.documentElement.classList.remove('cursor-active', 'cursor-hover')
      }
    }

    const handleInteractiveEnter = (event) => {
      if (event.target.closest('.custom-cursor-target')) {
        document.documentElement.classList.add('cursor-hover')
      }
    }

    const handleInteractiveLeave = (event) => {
      if (event.target.closest('.custom-cursor-target')) {
        document.documentElement.classList.remove('cursor-hover')
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)
    document.addEventListener('mouseenter', handleInteractiveEnter, true)
    document.addEventListener('mouseleave', handleInteractiveLeave, true)

    const animate = () => {
      if (outlineRef.current && outlinePositionRef.current) {
        outlinePositionRef.current.x += (positionRef.current.x - outlinePositionRef.current.x) * 0.2
        outlinePositionRef.current.y += (positionRef.current.y - outlinePositionRef.current.y) * 0.2
        outlineRef.current.style.left = outlinePositionRef.current.x + 'px'
        outlineRef.current.style.top = outlinePositionRef.current.y + 'px'
      }
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
      document.removeEventListener('mouseenter', handleInteractiveEnter, true)
      document.removeEventListener('mouseleave', handleInteractiveLeave, true)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  return (
    <>
      <div ref={outlineRef} className="cursor-outline" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  )
}

export default CustomCursor