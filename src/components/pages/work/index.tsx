import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { WORKS } from '../../../constants/routes'
import { useLocalizedStrings } from '../../../localization/use-localized-strings'
import Gallery from '../../common/gallery'
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
          <Link to={WORKS}><h1>{strings.works}/</h1></Link><span>{project?.name || ''}</span>
        </div>

        <div className='work__close-work'>
          <Link to={WORKS}>{strings.closeWork}</Link>
        </div>
      </div>

      <LoadingSuspense loading={loading} >
        <div className='work__content-section'>
          <div className='work__content-column-info'>
            <div className='work__images-box'>
              <Gallery images={project?.images}/>
            </div>

            <div className='work__info-box'>
            {date
              ? <div className='work__info-item'>
                    <h2>{strings.date}</h2>
                    <p>{date}</p>
                  </div>
              : null}

              {project?.stack?.length
                ? <div className='work__info-item'>
                    <h2>{strings.stack}</h2>
                    {project.stack.map((i, index) =>
                      <p key={i + index}>{i}</p>)}
                  </div>
                : null}

              {project?.links?.length
                ? <div className='work__info-item'>
                    <h2>{strings.links}</h2>
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
