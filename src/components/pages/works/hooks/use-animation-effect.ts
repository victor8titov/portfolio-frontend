import { useCallback, useEffect, useMemo, useRef } from 'react'

const useAnimationEffect = (id: string) => {
  const constrain = useMemo(() => 40, [])

  const elm = useRef<HTMLElement | null>(null)

  const transforms = useCallback((x: number) => {
    if (!elm.current) return

    const box = elm.current.getBoundingClientRect()
    const calcY = -(x - box.x - (box.width / 2)) / constrain

    elm.current.style.transform = `
      perspective(300px)
      rotateX(${calcY}deg)
      rotateY(${calcY}deg)
      scale(0.9)`
  }, [elm, constrain])

  useEffect(() => {
    elm.current = document.getElementById(id)
    if (elm.current) elm.current.style.transition = 'transform linear 500ms'
  }, [elm, id])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      window.requestAnimationFrame(() => {
        transforms(e.clientX)
      })
    }

    const handleMouseLeave = () => {
      window.requestAnimationFrame(() => {
        if (!elm.current) return

        elm.current.style.transform = `
          perspective(300px) 
          rotateX(0deg)
          rotateY(0deg)
          scale(1)`

        elm.current.style.transitionTimingFunction = 'cubic-bezier(.33,1.33,.66,.99)'
        elm.current.style.transitionDuration = '1000ms'
      })
    }

    const handleMouseEnter = () => {
      if (!elm.current) return

      elm.current.style.transitionTimingFunction = 'linear'
      elm.current.style.transitionDuration = '400ms'
    }

    if (elm.current) {
      elm.current.addEventListener('mouseenter', handleMouseEnter)
      elm.current.addEventListener('mousemove', handleMouseMove)
      elm.current.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (elm.current) {
        elm.current.removeEventListener('mousemove', handleMouseMove)
        elm.current.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [id, transforms, elm])
}

export default useAnimationEffect
