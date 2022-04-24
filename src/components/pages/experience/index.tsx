import moment from 'moment'
import React, { FC } from 'react'
import LoadingSuspense from '../../common/loading-suspense'
import TimeLine from '../../common/timeline'
import useContentManager from './hooks/use-content-content'
import './styles.scss'

const Experience: FC = () => {
  const { loading, timeStamps, language } = useContentManager()
  console.log(timeStamps)
  let tempYear: number | null = null

  return (
    <section className='experience'>
      <div className='experience__title'>
        <h1>Experience</h1>
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
                    <p>{timeStamp.description}</p>
                  </TimeLine.Item>
                </>
              )
            })}
          </TimeLine>
        </div>
      </LoadingSuspense>
    </section>
  )
}

export default Experience
