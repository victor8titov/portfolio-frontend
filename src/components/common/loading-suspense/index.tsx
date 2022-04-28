import React, { FC } from 'react'
import './styles.scss'

type Props = {
  loading?: boolean;
  children?: React.ReactNode;
};

const LoadingSuspense: FC<Props> = (props) => {
  const { children, loading = true } = props

  if (!loading && children) return <>{children}</>

  return (
    <div className="loading">
      <p>Loading</p>
      <span className="loading__line loading__line_1"></span>
      <span className="loading__line loading__line_2"></span>
      <span className="loading__line loading__line_3"></span>
      <span className="loading__line loading__line_4"></span>
      <span className="loading__line loading__line_5"></span>
      <span className="loading__line loading__line_6"></span>
      <span className="loading__line loading__line_7"></span>
      <span className="loading__line loading__line_8"></span>
      <span className="loading__line loading__line_9"></span>
    </div>
  )
}

export default LoadingSuspense
