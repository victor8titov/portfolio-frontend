import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type UseScroll = (props: { onTransitionUp?: () => void, onTransitionDown?: () => void }) => {
  transitionOver: number
}

const useScroll: UseScroll = ({ onTransitionUp, onTransitionDown }) => {
  const [transitionOver, setTransitionOver] = useState<number>(0)

  const volume = useMemo(() => 600, [])
  const sum = useRef<number>(0)
  const howMuchWeAddToTheSum = useRef<number>(45)
  // The height of the visible area of the browser
  const viewportHeight = useRef<number>(window.innerHeight)
  const freezeState = useRef<boolean>(false)

  // check that we are either at the beginning or at the end of the block with content
  const checkIsStartOrEndContent = useCallback((scrollY: number): boolean => {
    if (!viewportHeight.current) return false
    // The height of the entire content, including outside the field of visibility
    const heightContent = document.body.scrollHeight

    return scrollY + viewportHeight.current + 1 > heightContent || scrollY === 0
  }, [])

  // We count interest to show if necessary for the interface
  const calculatePercentBeforeTransition = useCallback(() => {
    const delta = 60
    if (Math.abs(sum.current) < delta) return

    const percent = Math.floor((100 / (volume - delta)) * (Math.abs(sum.current) - delta))

    if (percent > 98) freezeState.current = true
    if ([10, 20, 30, 40, 50, 60, 70, 80, 90, 100].some(i => percent <= i + 5 || percent >= i - 5)) setTransitionOver(percent)
  }, [volume])

  const handleWheel = useCallback((e: WheelEvent) => {
    if (freezeState.current) return

    // Add a strictly specified number to the amount do not use the delta of mouse
    if (typeof sum.current === 'number') {
      sum.current =
        (e.deltaY > 0 ? howMuchWeAddToTheSum.current : -howMuchWeAddToTheSum.current) + sum.current
    }

    if (checkIsStartOrEndContent(scrollY)) {
      if (!onTransitionUp && e.deltaY < 0) return
      if (!onTransitionDown && e.deltaY > 0) return

      if (Math.abs(sum.current) > volume + 100) sum.current = 0

      calculatePercentBeforeTransition()

      if (onTransitionDown && sum.current > 0 && Math.abs(sum.current) >= volume) {
        sum.current = 0
        setTransitionOver(0)
        onTransitionDown()
      }

      if (onTransitionUp && sum.current < 0 && Math.abs(sum.current) >= volume) {
        sum.current = 0
        setTransitionOver(0)
        onTransitionUp()
      }
    } else {
      if (sum.current === 0) return
      sum.current = 0
      setTransitionOver(0)
    }
  }, [volume, calculatePercentBeforeTransition, checkIsStartOrEndContent, onTransitionDown, onTransitionUp])

  const handleResize = useCallback(() => {
    if (viewportHeight.current) viewportHeight.current = window.innerHeight
    freezeState.current = false
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
