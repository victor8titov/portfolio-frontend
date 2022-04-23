import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, State } from '../store'
import { settingsActions } from '../store/slices/settings'
import { Language } from '../types/common'
import { strings as langStrings } from './init-localization'

type UseLocalizedStrings = () => {
  strings: typeof langStrings
  setLanguage: (language: Language) => void
  currentLanguage: Language | null
}

export const useLocalizedStrings: UseLocalizedStrings = () => {
  const dispatch: AppDispatch = useDispatch()

  const currentLanguage = useSelector((state: State) => state.settings.language)

  const setLanguage = useCallback((language: Language) => {
    langStrings.setLanguage(language)
    dispatch(settingsActions.setLanguage(language))
  }, [dispatch])

  const strings = useMemo(() => ({ ...langStrings }), [currentLanguage])

  return {
    strings,
    setLanguage,
    currentLanguage
  }
}
