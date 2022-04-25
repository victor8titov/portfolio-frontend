import React, { FC } from 'react'
import { useLocalizedStrings } from '../../../localization/use-localized-strings'
import LoadingSuspense from '../../common/loading-suspense'
import CardProject from './components/card-project'
import useContentManager from './hooks/use-content-manager'
import './styles.scss'

const Works: FC = () => {
  const { loading, projects } = useContentManager()
  const { strings } = useLocalizedStrings()

  return (
    <section className='works'>
      <div className='works__title-section'>
        <h1>{strings.works}</h1>
      </div>

      <LoadingSuspense loading={loading}>
        <div className='works__content'>
          <div className='works__bottom-box-down'></div>
          <div className='works__cards-box'>
            {projects?.items.map(project => (
              <CardProject project={project} key={project.id} />
            ))}
          </div>
          <div className='works__bottom-box-up'></div>
        </div>
      </LoadingSuspense>
    </section>
  )
}

export default Works
