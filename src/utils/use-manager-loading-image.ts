import { useCallback, useMemo, useState } from 'react'

export type StatusImage = {
  loaded: boolean
  loading: boolean
  hasError: boolean
  url: string | null
}

type UseManagerLoadingImage = () => {
  loadImage: (url: string) => void
  statusImage: StatusImage

}

const useManagerLoadingImage: UseManagerLoadingImage = () => {
  const initStatus: StatusImage = useMemo(() => ({ loaded: false, loading: false, hasError: false, url: null, image: null }), [])

  const [statusImage, setStatusImage] = useState<StatusImage>(initStatus)

  const load = useCallback(async (url: string) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image()
      image.onerror = reject
      image.onload = () => resolve(image)
      image.src = url
    })
  }, [])

  const loadImage = useCallback(async (url: string) => {
    try {
      setStatusImage(state => ({ ...state, loading: true, url }))
      await load(url)
      setStatusImage(state => ({ ...state, loading: false, loaded: true }))
    } catch {
      setStatusImage(state => ({ ...state, hasError: true, loaded: true, loading: false }))
    }
  }, [load])

  return {
    loadImage,
    statusImage
  }
}

export default useManagerLoadingImage
