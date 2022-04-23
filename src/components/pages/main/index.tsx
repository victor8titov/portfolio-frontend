import './styles.scss'
import React, { FC } from 'react'
import useMainContentManager from './hooks/use-main-content-manager'

const Main: FC = () => {
  const { title, subtitle, description, avatarImg } = useMainContentManager()
  return (
    <section className='main'>
      <div className='main__avatar'>
        {avatarImg ? <img src={avatarImg} alt='avatar' width='100%' /> : null}
      </div>
      <div className='main__description'>
        {title ? <h1>{title}</h1> : null}
        {subtitle ? <h2>{subtitle}</h2> : null}
        {description ? description.map(i => <p key={i}>{i}</p>) : null}
      </div>
    </section>
  )
}

export default Main
