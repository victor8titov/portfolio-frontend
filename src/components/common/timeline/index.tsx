import React, { FC, useMemo } from 'react'
import { uniteClasses } from '../../../utils/unite-style-classes'
import TimeLineItem from './components/item'
import './styles.scss'

type Props = {
  children?: React.ReactChild[] | React.ReactChild
  mode?: 'centered' | 'split' | 'default'
  className?: string
}

interface TimeLineType extends FC<Props> {
  Item: typeof TimeLineItem
}

const TimeLine: TimeLineType = (props) => {
  const { children, mode = 'default', className } = props
  const classNameForMode = useMemo(() => mode !== 'default' ? 'timeline_' + mode : '', [mode])
  return (
    <div className={uniteClasses('timeline', classNameForMode, className)} >
      {children || null}
    </div>
  )
}

TimeLine.Item = TimeLineItem

export default TimeLine
