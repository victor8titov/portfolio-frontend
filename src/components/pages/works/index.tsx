import React, { FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { MAIN, SKILLS } from '../../../constants/routes'
import { useLocalizedStrings } from '../../../localization/use-localized-strings'
import useScroll from '../../../utils/use-scroll'
import LoadingSuspense from '../../common/loading-suspense'
import Scroll from '../../common/scroll'
import CardProject from './components/card-project'
import useContentManager from './hooks/use-content-manager'
import './styles.scss'

const Works: FC = () => {
  const navigate = useNavigate()

  const { loading, projects } = useContentManager()
  const { strings } = useLocalizedStrings()

  const goToSkillsPage = useCallback(() => {
    navigate(SKILLS)
  }, [navigate])

  const goToMainPage = useCallback(() => {
    navigate(MAIN)
  }, [navigate])
  const { transitionOver } = useScroll({ onTransitionDown: goToSkillsPage, onTransitionUp: goToMainPage })

  return (
    <section className='works'>
      <div className='works__title-section'>
        <h1>{strings.works}</h1>
      </div>

      <LoadingSuspense loading={loading}>
        <div className='works__content'>
          <div className='works__cards-box'>
            {projects?.items.map(project => (
              <CardProject project={project} key={project.id} />
            ))}
          </div>
        </div>
      </LoadingSuspense>
      <Scroll percent={transitionOver}/>
    </section>
  )
}

export default Works
