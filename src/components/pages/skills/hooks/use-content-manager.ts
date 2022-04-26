import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListSkillsResponse } from '../../../../api/types/skills.types'
import { AppDispatch, State } from '../../../../store'
import { skillsAction } from '../../../../store/slices/skills'

type UseContentManager = () => {
  skills: ListSkillsResponse | null
  loading: boolean
}

const useContentManager: UseContentManager = () => {
  const dispatch: AppDispatch = useDispatch()

  const language = useSelector((state: State) => state.settings.language)
  const skills = useSelector((state: State) => state.skills.skills.find(i => i.currentLanguage === language) || null)
  const hasError = useSelector((state: State) => state.skills.hasError)
  const isEmpty = useSelector((state: State) => state.skills.isEmpty)
  const loading = useSelector((state: State) => state.skills.loading)

  useEffect(() => {
    if (
      !isEmpty &&
      !hasError &&
      !loading &&
      !skills?.items.length &&
      language
    ) {
      dispatch(skillsAction.fetchSkills({ language }))
    }
  }, [language, hasError, loading, skills, dispatch, isEmpty])

  return {
    skills,
    loading
  }
}

export default useContentManager
