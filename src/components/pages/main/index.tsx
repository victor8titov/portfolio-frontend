import './styles.scss'
import React, { FC } from 'react'
import useMainContentManager from './hooks/use-main-content-manager'

const Main: FC = () => {
  const { title, subtitle, description, statusImage, loading } = useMainContentManager()
  return (
    <section className='main'>
      <div className='main__avatar'>
        {statusImage.url && statusImage.loaded ? <img src={statusImage.url} alt='avatar' width='100%' /> : null}
        {statusImage.loading && <p>Loading...</p>}
      </div>
      <div className='main__description'>
        {loading && <p>Loading...</p>}
        {title ? <h1>{title}</h1> : null}
        {subtitle ? <h2>{subtitle}</h2> : null}
        {description ? description.map(i => <p key={i}>{i}</p>) : null}
      </div>
    </section>
  )
}

export default Main
