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
        dotRef.current.style.transform = `translate(calc(${event.clientX}px - 50%), calc(${event.clientY}px - 50%))`
      }
    }

    const handleInteractiveEnter = () => {
      document.documentElement.classList.add('cursor-hover')
    }

    const handleInteractiveLeave = () => {
      document.documentElement.classList.remove('cursor-hover')
    }

    const interactiveEls = document.querySelectorAll('a, button, input, textarea, .hamburger')
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', handleInteractiveEnter)
      el.addEventListener('mouseleave', handleInteractiveLeave)
    })

    document.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      outlinePositionRef.current.x += (positionRef.current.x - outlinePositionRef.current.x) * 0.18
      outlinePositionRef.current.y += (positionRef.current.y - outlinePositionRef.current.y) * 0.18
      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate(calc(${outlinePositionRef.current.x}px - 50%), calc(${outlinePositionRef.current.y}px - 50%))`
      }
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', handleInteractiveEnter)
        el.removeEventListener('mouseleave', handleInteractiveLeave)
      })
      cancelAnimationFrame(requestRef.current)
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