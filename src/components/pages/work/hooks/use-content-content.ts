import { useParams } from "react-router-dom"

type UseContentManager = () => {}

const useContentManager: UseContentManager = () => {
  const { workId } = useParams()
  console.log(workId)
  return {}
} 

export default useContentManager
