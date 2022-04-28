import React, { FC } from 'react'
import LoadingSuspense from '../loading-suspense'

type Props = {
  component: React.FC
}

const Suspense:FC<Props> = (props) => {
  const { component: Component } = props

  return (
    <React.Suspense fallback={<LoadingSuspense loading={true} />}>
      <Component />
    </React.Suspense>
  )
}

export default Suspense
