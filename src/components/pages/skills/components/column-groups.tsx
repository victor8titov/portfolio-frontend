import React, { FC } from 'react'
import { ListSkillsResponse } from '../../../../api/types/skills.types'

const ColumnGroups: FC<{groups: string[], skills: ListSkillsResponse | null}> = ({ groups, skills }) => {
  return (
    <>
      {groups.map((group, index) => {
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

export default ColumnGroups
