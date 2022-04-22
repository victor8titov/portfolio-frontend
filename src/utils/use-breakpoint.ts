import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import breakpoints from '../constants/breakpoints'

type Breakpoints = {
  xs: boolean,
  sm: boolean,
  md: boolean,
  lg: boolean,
  xl: boolean,
}

type UseBreakpoint = () => Breakpoints

const useBreakpoint: UseBreakpoint = () => {
  const initBreakpoints = useMemo(() => (
    {
      xs: false,
      sm: false,
      md: false,
      lg: false,
      xl: false
    }), [])

  const [state, setState] = useState<Breakpoints>(initBreakpoints)

  const lastPoint = useRef<'xs' | 'sm' | 'md' | 'lg' | 'xl' | null>(null)
  const handleResize = useCallback(() => {
    const { sm, md, lg, xl } = breakpoints
    const width = window.innerWidth

    if (width > 0 && width < sm && lastPoint.current !== 'xs') {
      lastPoint.current = 'xs'
      setState({ xs: true, sm: false, md: false, lg: false, xl: false })
    }
    if (width > sm && width < md && lastPoint.current !== 'sm') {
      lastPoint.current = 'sm'
      setState({ xs: true, sm: true, md: false, lg: false, xl: false })
    }
    if (width > md && width < lg && lastPoint.current !== 'md') {
      lastPoint.current = 'md'
      setState({ xs: true, sm: true, md: true, lg: false, xl: false })
    }
    if (width > lg && width < xl && lastPoint.current !== 'lg') {
      lastPoint.current = 'lg'
      setState({ xs: true, sm: true, md: true, lg: true, xl: false })
    }
    if (width > xl && lastPoint.current !== 'xl') {
      lastPoint.current = 'xl'
      setState({ xs: true, sm: true, md: true, lg: true, xl: true })
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  return state
}

export default useBreakpoint
