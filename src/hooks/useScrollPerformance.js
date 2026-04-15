import { useState, useEffect, useRef } from 'react'

/**
 * Hook personalizado para scroll throttled
 * reduce el número de actualizaciones de estado durante el scroll
 */
export function useThrottledScroll(throttleMs = 16) {
  const [scrollY, setScrollY] = useState(0)
  const lastUpdateRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now()
      if (now - lastUpdateRef.current >= throttleMs) {
        lastUpdateRef.current = now
        setScrollY(window.scrollY)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [throttleMs])

  return scrollY
}

/**
 * Hook para intersection observer con threshold adaptativo
 */
export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, { threshold: 0.1, ...options })

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return [ref, isIntersecting]
}
