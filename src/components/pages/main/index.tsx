import './styles.scss'
import React, { FC, useCallback } from 'react'
import useMainContentManager from './hooks/use-main-content-manager'
import useScroll from '../../../utils/use-scroll'
import { useNavigate } from 'react-router-dom'
import { WORKS } from '../../../constants/routes'
import Scroll from '../../common/scroll'
import LoadingSuspense from '../../common/loading-suspense'

const Main: FC = () => {
  const navigate = useNavigate()
  const { title, subtitle, description, statusImage, loading } = useMainContentManager()

  const goToWorksPage = useCallback(() => {
    navigate(WORKS)
  }, [])
  const { transitionOver } = useScroll({ onTransitionDown: goToWorksPage })

  return (
    <section className='main'>

      <LoadingSuspense loading={statusImage.loading}>
        <div className='main__avatar'>
          {statusImage.url && statusImage.loaded ? <img src={statusImage.url} alt='avatar' width='100%' /> : null}
          {statusImage.loading && <p>Loading...</p>}
        </div>
      </LoadingSuspense>

      <LoadingSuspense loading={loading}>
        <div className='main__description'>
          {title ? <h1>{title}</h1> : null}
          {subtitle ? <h2>{subtitle}</h2> : null}
          {description ? description.map(i => <p key={i}>{i}</p>) : null}
        </div>
      </LoadingSuspense>
      <Scroll percent={transitionOver}/>
    </section>
  )
}

export default Main
