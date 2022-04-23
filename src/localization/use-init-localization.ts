import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { settingsActions } from '../store/slices/settings'
import { Language } from '../types/common'
import { strings as langStrings } from './init-localization'

export const useInitLocalization = (): void => {
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const language = langStrings.getLanguage()

    if (Object.values(Language).some(i => i === language)) {
      dispatch(settingsActions.setLanguage(language as Language))
    } else {
      dispatch(settingsActions.setLanguage(Language.EN))
    }
  }, [dispatch])
}
