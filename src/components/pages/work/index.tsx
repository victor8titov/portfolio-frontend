import React, { FC } from 'react'
import { WORKS } from '../../../constants/routes'
import { useLocalizedStrings } from '../../../localization/use-localized-strings'
import LoadingSuspense from '../../common/loading-suspense'
import useContentManager from './hooks/use-content-content'
import './styles.scss'

const Work: FC = () => {
  const { strings } = useLocalizedStrings()
  const { loading, project, description, date } = useContentManager()

  return (
    <section className='work'>
      <div className='work__header-section'>
        <div className='work__bread-crumbs'>
          <a href={'/' + WORKS}><h1>{strings.works}/</h1></a><span>{project?.name || ''}</span>
        </div>

        <div className='work__close-work'>
          <a href={'/' + WORKS}>{strings.closeWork}</a>
        </div>
      </div>

      <LoadingSuspense loading={loading} >
        <div className='work__content-section'>
          <div className='work__content-column-info'>
            <div className='work__images-box'>
              <p>img box</p>
            </div>

            <div className='work__info-box'>
            {date
              ? <div className='work__info-item'>
                    <h2>Дата</h2>
                    <p>{date}</p>
                  </div>
              : null}

              {project?.stack
                ? <div className='work__info-item'>
                    <h2>Стек</h2>
                    {project.stack.map((i, index) =>
                      <p key={i + index}>{i}</p>)}
                  </div>
                : null}

              {project?.links
                ? <div className='work__info-item'>
                    <h2>Ссылки</h2>
                    <ul>
                      {project.links.map((i, index) => <li key={i.link + index}><a href={i.link}>{i.name ? i.name : i.link}</a></li>)}
                    </ul>
                  </div>
                : null}

            </div>
          </div>
          <div className='work__content-column-main-text'>
            <h2>{strings.description}</h2>
            {project?.type ? <h3>{project.type}</h3> : null}
            {description.map((i, index) => <p key={i + index}>{i}</p>)}
          </div>
        </div>
      </LoadingSuspense>
    </section>
  )
}

export default Work
