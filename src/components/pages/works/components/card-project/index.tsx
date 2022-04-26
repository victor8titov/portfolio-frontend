import React, { FC, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProjectView } from '../../../../../api/types/projects'
import { getUrlImageByTemplate } from '../../../../../utils/get-url-image'
import { uniteClasses } from '../../../../../utils/unite-style-classes'
import useAnimationEffect from '../../hooks/use-animation-effect'
import './styles.scss'

type Props = {
  project: ProjectView
  className?: string
}

const CardProject: FC<Props> = (props) => {
  const navigate = useNavigate()
  const { project, className } = props
  const { images, name } = project
  const description = images && images[0] && images[0].description || name || 'project image'
  const url = (images && images[0] && getUrlImageByTemplate(images[0], 'mid')) || null

  const id = useMemo(() => 'card' + project.id, [project])
  useAnimationEffect(id)

  const handleClickCard = useCallback((id: string | null | undefined) => () => { 
    if (id) navigate(`/works/${id}`)
  }, [navigate])

  return (
    <div className={uniteClasses('project-card', className)} onClick={handleClickCard(project.id)}>
      <div className='project-card__image-box' id={id}>
        {url ? <img src={url} alt={description} width='100%' /> : null}
      </div>
      <h3>{name}</h3>
    </div>
  )
}

export default CardProject
