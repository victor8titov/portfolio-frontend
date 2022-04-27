import React, { CSSProperties, FC } from 'react'
import { uniteClasses } from '../../../../utils/unite-style-classes'

type Props = {
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
};

const NextArrow: FC<Props> = ({ className, style, onClick }) => {
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
        d="M1 6.5C0.723858 6.5 0.5 6.72386 0.5 7C0.5 7.27614 0.723858 7.5 1 7.5V6.5ZM1 7.5H61V6.5H1V7.5Z"
        fill="#E2D02D"
      />
      <path
        d="M56.7998 13L60.9998 7L56.7998 1"
        stroke="#E2D02D"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default NextArrow
