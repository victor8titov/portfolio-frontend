import React, { FC, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { EXPERIENCE, WORKS } from '../../../constants/routes'
import { useLocalizedStrings } from '../../../localization/use-localized-strings'
import useScroll from '../../../utils/use-scroll'
import LoadingSuspense from '../../common/loading-suspense'
import Scroll from '../../common/scroll'
import ColumnGroups from './components/column-groups'
import useContentManager from './hooks/use-content-manager'
import './styles.scss'

const Skills: FC = () => {
  const navigate = useNavigate()
  const { skills, loading } = useContentManager()
  const { strings } = useLocalizedStrings()

  const groupsLeft = useMemo(
    () => skills?.groups.slice(0, Math.round(skills.groups.length / 2)) || [],
    [skills]
  )
  const groupsRight = useMemo(
    () => skills?.groups.slice(Math.round(skills.groups.length / 2)) || [],
    [skills]
  )

  const goToWorksPage = useCallback(() => {
    navigate(WORKS)
  }, [navigate])

  const goToExperiencePage = useCallback(() => {
    navigate(EXPERIENCE)
  }, [navigate])
  const { transitionOver } = useScroll({ onTransitionDown: goToExperiencePage, onTransitionUp: goToWorksPage })

  return (
    <section className="skills">
      <div className="skills__title-section">
        <h1>{strings.skills}</h1>
      </div>

      <LoadingSuspense loading={loading}>
        <div className="skills__column-left">
          <ColumnGroups groups={groupsLeft} skills={skills} />
        </div>
        <div className="skills__column-right">
          <ColumnGroups groups={groupsRight} skills={skills} />
        </div>
      </LoadingSuspense>
      <Scroll percent={transitionOver}/>
    </section>
  )
}

export default Skills
