import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, State } from '../../../../store'
import { homePageActions } from '../../../../store/slices/homepage'
import { getUrlImageByTemplate } from '../../../../utils/get-url-image'
import useBreakpoint from '../../../../utils/use-breakpoint'

type UseMainContentManager = () => {
  title: string | null
  subtitle: string | null
  description: string[] | null
  avatarImg: string | null
}

const useMainContentManager: UseMainContentManager = () => {
  const dispatch: AppDispatch = useDispatch()

  const isDesktop = useBreakpoint().md

  const language = useSelector((state: State) => state.settings.language)
  const loading = useSelector((state: State) => state.homePage.loading)
  const homePageList = useSelector((state: State) => state.homePage.homePageList)
  const hasError = useSelector((state: State) => state.homePage.hasError)

  const homePage = useMemo(() => homePageList.find(i => i.currentLanguage === language) || null, [homePageList, language])
  const title = useMemo(() => homePage?.title ? homePage.title : null, [homePage])
  const subtitle = useMemo(() => homePage?.subtitle ? homePage.subtitle : null, [homePage])
  const description = useMemo(() =>
    homePage?.description
      ? homePage.description.split('\n').filter(i => i)
      : null, [homePage])
  const avatarImg = useCallback(() => {
    if (!homePage || !homePage.avatars || !homePage.avatars.length) return null

    const avatar = [...homePage.avatars].shift()
    if (!avatar) return null

    const src = getUrlImageByTemplate(avatar.image, isDesktop ? 'original' : 'mid')

    return src || null
  }, [homePage, isDesktop])

  useEffect(() => {
    if (
      !loading &&
      !hasError &&
      language &&
      !homePageList.some(i => i.currentLanguage === language)
    ) {
      dispatch(homePageActions.fetchHomePage({ language }))
    }
  }, [homePageList, hasError, dispatch, language, loading])

  return {
    title,
    subtitle,
    description,
    avatarImg: avatarImg()
  }
}

export default useMainContentManager
