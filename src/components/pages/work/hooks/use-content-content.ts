import moment from 'moment'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ProjectView } from '../../../../api/types/projects'
import { AppDispatch, State } from '../../../../store'
import { projectsAction } from '../../../../store/slices/projects'

type UseContentManager = () => {
  project: ProjectView | null
  loading: boolean
  description: string[]
  date: string | null
}

const useContentManager: UseContentManager = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const { workId } = useParams()
  const language = useSelector((state: State) => state.settings.language)
  const projectList = useSelector((state: State) => state.projects.project)
  const hasError = useSelector((state: State) => state.projects.hasError)
  const loading = useSelector((state: State) => state.projects.loading)

  const project = useMemo(() => projectList.find(i => i.currentLanguage === language) || null, [language, projectList])
  const description = useMemo(() => project?.description?.split('\n') || [''], [project])

  const date: string | null = useMemo(() => {
    if (!project?.events[0]?.date) return null
    const date = moment(project?.events[0]?.date)
    if (language) date.locale(language)
    return date.format('MMM YYYY')
  }, [language, project])

  useEffect(() => {
    if (
      !hasError &&
      !loading &&
      !project &&
      language &&
      workId
    ) {
      dispatch(projectsAction.fetchProjectById({ id: workId, language }))
    }
  }, [language, hasError, loading, project, dispatch, workId])

  useEffect(() => {
    return () => {
      dispatch(projectsAction.clear())
    }
  }, [dispatch])

  useEffect(() => {
    if (hasError) navigate('/')
  }, [hasError, navigate])

  return {
    loading,
    project,
    description,
    date
  }
}

export default useContentManager
