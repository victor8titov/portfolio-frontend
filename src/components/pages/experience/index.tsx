import moment from 'moment'
import React, { FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { TimeStampView } from '../../../api/types/time-stamp.types'
import { SKILLS } from '../../../constants/routes'
import { useLocalizedStrings } from '../../../localization/use-localized-strings'
import { parseString } from '../../../utils/parse-string'
import useScroll from '../../../utils/use-scroll'
import LoadingSuspense from '../../common/loading-suspense'
import Scroll from '../../common/scroll'
import TimeLine from '../../common/timeline'
import useContentManager from './hooks/use-content-content'
import './styles.scss'

const Experience: FC = () => {
  const navigate = useNavigate()

  const { loading, timeStamps, language } = useContentManager()
  const { strings } = useLocalizedStrings()

  const getDescription = useCallback((timeStamp: TimeStampView) =>
    parseString(timeStamp.description)
  , [])

  const goToSkillsPage = useCallback(() => {
    navigate(SKILLS)
  }, [navigate])

  const { transitionOver } = useScroll({ onTransitionUp: goToSkillsPage })

  let tempYear: number | null = null

  return (
    <section className='experience'>
      <div className='experience__title'>
        <h1>{strings.experience}</h1>
      </div>

      <LoadingSuspense loading={loading}>
        <div className='experience__content'>
          <TimeLine mode='split'>
            {timeStamps?.items.map((timeStamp, index) => {
              const startDate = moment(timeStamp?.events?.find(i => i.status === 'start')?.date)
              if (language) startDate.locale(language)

              const year = startDate.year() || null

              const isNewYear = index !== 0 && tempYear !== year
              if (index === 0) tempYear = year
              if (isNewYear) tempYear = year

              const infoText = startDate.format('MMM YYYY')

              return (
                <>
                  {isNewYear
                    ? <TimeLine.Item period key={timeStamp.id + 'period'} className='experience__item'>
                        <h2>{year}</h2>
                      </TimeLine.Item>
                    : null
                  }
                  <TimeLine.Item info={infoText} key={timeStamp.id} className='experience__item'>
                    <h3>{timeStamp.name}</h3>
                    <>
                    {
                      getDescription(timeStamp)
                        .map((i, index) => <p key={i + index} dangerouslySetInnerHTML={{ __html: i }}/>)
                    }
                    </>
                  </TimeLine.Item>
                </>
              )
            })}
          </TimeLine>
        </div>
      </LoadingSuspense>
      <Scroll percent={transitionOver}/>
    </section>
  )
}

export default Experience
