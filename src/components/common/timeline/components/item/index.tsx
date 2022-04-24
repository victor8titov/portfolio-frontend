import React, { FC } from 'react'
import { uniteClasses } from '../../../../../utils/unite-style-classes'
import './styles.scss'

type Props = {
  children?: React.ReactChild[] | React.ReactChild;
  info?: string;
  period?: boolean
  className?: string
};
const TimeLineItem: FC<Props> = (props) => {
  const { children, info, period, className } = props
  return (
    <div className={uniteClasses('timeline-item', period ? 'timeline-item_period' : '', className)} >
      <div className="timeline-item__info">
        <span>{info || ''}</span>
      </div>

      <div className="timeline-item__marker"></div>
      <div className="timeline-item__content">{children || null}</div>
    </div>
  )
}

export default TimeLineItem
