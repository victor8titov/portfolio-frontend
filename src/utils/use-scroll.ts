import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type UseScroll = (props: { onTransitionUp?: () => void, onTransitionDown?: () => void }) => {
  transitionOver: number
}

const useScroll: UseScroll = ({ onTransitionUp, onTransitionDown }) => {
  const [transitionOver, setTransitionOver] = useState<number>(0)

  const volume = useMemo(() => 600, [])
  const sum = useRef<number>(0)
  const viewportHeight = useRef<number>(window.innerHeight)

  const checkIsEndScrollContent = useCallback((scrollY: number): boolean => {
    if (!viewportHeight.current) return false
    const heightContent = document.body.scrollHeight

    return scrollY + viewportHeight.current + 1 > heightContent || scrollY === 0
  }, [])

  const calculatePercentBeforeTransition = useCallback(() => {
    if (Math.abs(sum.current) > volume + 100) sum.current = 0
    const delta = 60
    if (Math.abs(sum.current) < delta) return

    const percent = Math.floor((100 / (volume - delta)) * (Math.abs(sum.current) - delta))
    console.log('per:', percent, sum.current)

    if ([10, 20, 30, 40, 50, 60, 70, 80, 90, 100].some(i => percent <= i + 5 || percent >= i - 5)) setTransitionOver(percent)

    if (onTransitionDown && sum.current > 0 && Math.abs(sum.current) > volume) {
      sum.current = 0
      setTransitionOver(0)
      onTransitionDown()
    }

    if (onTransitionUp && sum.current < 0 && Math.abs(sum.current) > volume) {
      sum.current = 0
      setTransitionOver(0)
      onTransitionUp()
    }
  }, [onTransitionDown, onTransitionUp, volume])

  const handleWheel = useCallback((e: WheelEvent) => {
    if (checkIsEndScrollContent(scrollY)) {
      if (!onTransitionUp && e.deltaY < 0) return
      if (!onTransitionDown && e.deltaY > 0) return

      if (typeof sum.current === 'number') sum.current = e.deltaY + sum.current

      calculatePercentBeforeTransition()
    } else {
      if (sum.current === 0) return
      sum.current = 0
      setTransitionOver(0)
    }
  }, [calculatePercentBeforeTransition, checkIsEndScrollContent, onTransitionDown, onTransitionUp])

  const handleResize = useCallback(() => {
    if (viewportHeight.current) viewportHeight.current = window.innerHeight
  }, [])

  useEffect(() => {
    window.addEventListener('wheel', handleWheel)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('resize', handleResize)
    }
  }, [handleWheel, handleResize])

  return {
    transitionOver
  }
}

export default useScroll
