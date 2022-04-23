import React, { FC } from 'react'
import { uniteClasses } from '../../../utils/unite-style-classes'
import './styles.scss'

type Props = {
  active?: boolean
}

const SquareMarker: FC<Props> = ({ active }) => {
  return (
    <div className={uniteClasses('square-marker', active ? 'square-marker_active' : '')}>
      <svg className='square-marker__square' width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M7.20632 3.429L5.0801 1.30821C4.68764 0.916757 4.0533 0.918596 3.66327 1.31232L1.55076 3.44479C1.16072 3.83852 1.16268 4.47503 1.55514 4.86648L3.68136 6.98727C4.07382 7.37872 4.70815 7.37688 5.09819 6.98316L7.2107 4.85068C7.60074 4.45696 7.59878 3.82045 7.20632 3.429ZM5.78632 0.595311C5.00141 -0.187595 3.73274 -0.183914 2.95266 0.603531L0.84015 2.736C0.0600762 3.52345 0.0639998 4.79647 0.848912 5.57938L2.97514 7.70016C3.76005 8.48307 5.02872 8.47939 5.8088 7.69194L7.92131 5.55947C8.70138 4.77203 8.69746 3.499 7.91255 2.7161L5.78632 0.595311Z" fill="#A3A8AE"/>
      </svg>

      <svg className='square-marker__square-fill' width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.49243 0.623999C3.88325 0.231153 4.51819 0.23005 4.91061 0.621535L7.39313 3.09813C7.78556 3.48962 7.78685 4.12544 7.39604 4.51829L4.92365 7.0035C4.53283 7.39635 3.89789 7.39745 3.50547 7.00596L1.02295 4.52937C0.630532 4.13788 0.629233 3.50206 1.02005 3.10921L3.49243 0.623999Z" fill="#E2D02D"/>
      </svg>

      <svg className='square-marker__square-active' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12.871 7.09287L7.90552 2.1401C7.51306 1.74864 6.87807 1.74975 6.48722 2.14256L1.54203 7.11256C1.15117 7.50537 1.15247 8.14114 1.54493 8.53259L6.51039 13.4854C6.90285 13.8768 7.53784 13.8757 7.92869 13.4829L12.8739 8.5129C13.2647 8.12009 13.2634 7.48432 12.871 7.09287ZM8.61322 1.42885C7.82831 0.645944 6.55832 0.64815 5.77662 1.43377L0.831427 6.40377C0.0497223 7.1894 0.0523188 8.46094 0.837227 9.24384L5.80269 14.1966C6.5876 14.9795 7.85759 14.9773 8.63929 14.1917L13.5845 9.22168C14.3662 8.43606 14.3636 7.16452 13.5787 6.38162L8.61322 1.42885Z" fill="#E2D02D"/>
      </svg>
    </div>
  )
}

export default SquareMarker