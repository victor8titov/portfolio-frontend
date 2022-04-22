import { useCallback, useEffect } from 'react'

type UseManageBodyScroll = (onResizeWidth?: () => void) => {
  showScroll: () => void
  hideScroll: () => void
}

const useManageBodyScroll: UseManageBodyScroll = (onResizeWidth) => {
  const getScrollbarWidth = useCallback(() => {
    const outer = document.createElement('div')

    outer.style.position = 'absolute'
    outer.style.top = '-9999px'
    outer.style.width = '50px'
    outer.style.height = '50px'
    outer.style.overflow = 'scroll'
    outer.style.visibility = 'hidden'

    document.body.appendChild(outer)

    const scrollBarWidth = outer.offsetWidth - outer.clientWidth
    document.body.removeChild(outer)

    return scrollBarWidth
  }, [])

  const hideScroll = useCallback(() => {
    document.body.style.paddingRight = `${getScrollbarWidth()}px`
    document.body.style.overflow = 'hidden'
  }, [getScrollbarWidth])

  const showScroll = useCallback(() => {
    document.body.style.paddingRight = ''
    document.body.style.overflow = 'visible'
  }, [])

  const handleResizeWidth = useCallback(() => {
    showScroll()

    if (onResizeWidth) onResizeWidth()
  }, [showScroll, onResizeWidth])

  useEffect(() => {
    window.addEventListener('resize', handleResizeWidth)
  }, [handleResizeWidth])

  return {
    showScroll,
    hideScroll
  }
}

export default useManageBodyScroll
