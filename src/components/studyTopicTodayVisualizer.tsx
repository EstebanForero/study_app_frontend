import { useQuery } from "@tanstack/react-query"
import { getStudyTopicsForToday } from "../backend/backend"
import StudyTopicComponent from "./studyTopic"

const StudyTopicTodayVisualizer = () => {

  const { data: studyTopics } = useQuery({
    queryKey: ['studyTopics'],
    queryFn: getStudyTopicsForToday
  })

  return (
    <div className="flex flex-row gap-4 flex-wrap">
      {studyTopics?.map(studyTopic => <StudyTopicComponent studyTopic={studyTopic} />)}
    </div>
  )
}

export default StudyTopicTodayVisualizer
