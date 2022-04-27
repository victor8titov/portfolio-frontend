import React, { CSSProperties, FC } from 'react'
import { uniteClasses } from '../../../../utils/unite-style-classes'

type Props = {
  className?: string
  onClick?: () => void
  style?: CSSProperties
}

const PrevArrow: FC<Props> = ({ className, style, onClick}) => {
  return (
    <svg
      className={uniteClasses(className)}
      style={style}
      onClick={onClick}
      width="62"
      height="14"
      viewBox="0 0 62 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M61 7.5C61.2761 7.5 61.5 7.27614 61.5 7C61.5 6.72386 61.2761 6.5 61 6.5V7.5ZM61 6.5L1 6.5V7.5L61 7.5V6.5Z"
        fill="#E2D02D"
      />
      <path
        d="M5.2002 1L1.00019 7L5.2002 13"
        stroke="#E2D02D"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default PrevArrow
