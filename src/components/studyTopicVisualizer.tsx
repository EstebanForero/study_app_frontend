import { useQuery } from "@tanstack/react-query"
import StudyTopicAdder from "./studyTopicAdder"
import { getStudyTopics } from "../backend/backend"
import StudyTopicComponent from "./studyTopic"

const StudyTopicVisualizer = () => {

  const { data: studyTopics } = useQuery({
    queryKey: ['studyTopics'],
    queryFn: getStudyTopics
  })

  return (
    <div className="flex flex-row gap-4 overflow-x-auto scrollbar">
      <StudyTopicAdder />
      {studyTopics?.map(studyTopic => <StudyTopicComponent studyTopic={studyTopic} key={studyTopic.id} />)}
    </div>
  )
}

export default StudyTopicVisualizer
