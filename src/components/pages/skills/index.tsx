import React, { FC, useMemo } from 'react'
import LoadingSuspense from '../../common/loading-suspense'
import useContentManager from './hooks/use-content-manager'
import './styles.scss'

const Skills: FC = () => {
  const { skills, loading } = useContentManager()
  const groupsLeft = useMemo(
    () => skills?.groups.slice(0, Math.round(skills.groups.length / 2)) || [],
    [skills]
  )
  const groupsRight = useMemo(
    () => skills?.groups.slice(Math.round(skills.groups.length / 2)) || [],
    [skills]
  )

  const ColumnGroups: FC<{list: string[]}> = ({ list }) => {
    return (
      <>
        {list.map((group, index) => {
          const found = skills?.items
            .filter((i) => i.group === group)
            .map((i) => i.name)
          return (
            <div key={group + found} className="skills__group" style={{ animationDelay: 150 * index + 'ms' }}>
              <h2>{group}</h2>
              <p>{found?.join(', ')}</p>
            </div>
          )
        })}
      </>
    )
  }
  return (
    <section className="skills">
      <div className="skills__title-section">
        <h1>Skills</h1>
      </div>

      <LoadingSuspense loading={loading}>
        <div className="skills__column-left">
          <ColumnGroups list={groupsLeft} />
        </div>
        <div className="skills__column-right">
          <ColumnGroups list={groupsRight} />
        </div>
      </LoadingSuspense>
    </section>
  )
}

export default Skills
