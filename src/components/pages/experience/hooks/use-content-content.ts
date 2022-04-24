import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListTimeStamps } from '../../../../api/types/time-stamp.types'
import { AppDispatch, State } from '../../../../store'
import { timeStampsAction } from '../../../../store/slices/time-stamps'
import { Language } from '../../../../types/common'

type UseContentManager = () => {
  timeStamps: ListTimeStamps | null
  loading: boolean
  language: Language | null
}

const useContentManager: UseContentManager = () => {
  const dispatch: AppDispatch = useDispatch()

  const language = useSelector((state: State) => state.settings.language)
  const timeStamps = useSelector((state: State) => state.timeStamps.timeStamps.find(i => i.currentLanguage === language) || null)
  const hasError = useSelector((state: State) => state.timeStamps.hasError)
  const loading = useSelector((state: State) => state.timeStamps.loading)

  useEffect(() => {
    if (
      !hasError &&
      !loading &&
      !timeStamps?.items.length &&
      language
    ) {
      dispatch(timeStampsAction.fetchTimeStamps({ language }))
    }
  }, [language, hasError, loading, timeStamps, dispatch])

  return {
    timeStamps,
    loading,
    language
  }
}

export default useContentManager
