import React, { FC } from 'react'

type Props = {
  loading: boolean
  children: React.ReactNode
}

const LoadingSuspense: FC<Props> = (props) => {
  const { children, loading } = props
  if (loading) return <p>Loading ...</p>
  return (
    <>
      {children}
    </>
  )
}

export default LoadingSuspense
