import React, { FC, useCallback } from 'react'
import { uniteClasses } from '../../../utils/unite-style-classes'
import './styles.scss'

const Scroll: FC<{ percent: number }> = ({ percent }) => {
  const getClassPercent = useCallback((): string => {
    let n = 0

    const kit = [10, 20, 30, 40, 50, 60, 70, 80, 90]
    kit.forEach(i => { if (percent >= i) n = i })

    return `mouse-scroll_${n}`
  }, [percent])
  return (
    <div className={uniteClasses('mouse-scroll', getClassPercent())}>
      <div className="mouse-scroll__wheel"></div>
    </div>
  )
}

export default Scroll
