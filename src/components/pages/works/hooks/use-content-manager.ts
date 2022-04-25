import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProjectList } from '../../../../api/types/projects'
import { AppDispatch, State } from '../../../../store'
import { projectsAction } from '../../../../store/slices/projects'

type UseContentManager = () => {
  projects: ProjectList | null
  loading: boolean
}

const useContentManager: UseContentManager = () => {
  const dispatch: AppDispatch = useDispatch()

  const language = useSelector((state: State) => state.settings.language)
  const projects = useSelector((state: State) => state.projects.projects.find(i => i.currentLanguage === language) || null)
  const hasError = useSelector((state: State) => state.projects.hasError)
  const loading = useSelector((state: State) => state.projects.loading)

  useEffect(() => {
    if (
      !hasError &&
      !loading &&
      !projects?.items.length &&
      language
    ) {
      dispatch(projectsAction.fetchProjects({ language, page: 1, pageSize: 200 }))
    }
  }, [language, hasError, loading, projects, dispatch])

  return {
    projects,
    loading
  }
}

export default useContentManager
