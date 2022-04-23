import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SocialMediaView } from '../../../../api/types/social-media.types'
import { AppDispatch, State } from '../../../../store'
import { socialMediaAction } from '../../../../store/slices/social-media'

type UseContentManager = () => {
  socialMedia: SocialMediaView[]
}

const useContentManager: UseContentManager = () => {
  const dispatch: AppDispatch = useDispatch()

  const socialMedia = useSelector((state: State) => state.socialMedia.socialMedia)

  useEffect(() => {
    dispatch(socialMediaAction.fetchSocialMedia())
  }, [dispatch])

  return {
    socialMedia
  }
}

export default useContentManager
