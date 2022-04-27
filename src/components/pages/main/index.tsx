import './styles.scss'
import React, { FC, useCallback } from 'react'
import useMainContentManager from './hooks/use-main-content-manager'
import useScroll from '../../../utils/use-scroll'
import { useNavigate } from 'react-router-dom'
import { WORKS } from '../../../constants/routes'
import Scroll from '../../common/scroll'

const Main: FC = () => {
  const navigate = useNavigate()
  const { title, subtitle, description, statusImage, loading } = useMainContentManager()

  const goToWorksPage = useCallback(() => {
    navigate(WORKS)
  }, [])
  const { transitionOver } = useScroll({ onTransitionDown: goToWorksPage })

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
      <Scroll percent={transitionOver}/>
    </section>
  )
}

export default Main
