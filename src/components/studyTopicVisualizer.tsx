import { useQuery } from "@tanstack/react-query"
import StudyTopicAdder from "./studyTopicAdder"
import { getStudyTopics } from "../backend/backend"

const StudyTopicVisualizer = () => {

  const { data: studyTopics } = useQuery({
    queryKey: ['studyTopics'],
    queryFn: getStudyTopics
  })

  return (
    <div className="flex flex-row gap-4">
      <StudyTopicAdder />
      {studyTopics?.map(studyTopic => (
        <div className="bg-gray-900 w-96 h-60 rounded-xl shadow-black shadow-lg p-4 flex flex-col" key={studyTopic.id}>
          <h2 className="text-white text-lg font-semibold ml-3">{studyTopic.name}</h2>
          <p className="text-white grow bg-gray-800 rounded-xl p-4 my-4">{studyTopic.description ?? 'No description added to this topic'}</p>
          <p className="text-white ml-3">Created at: {studyTopic.creation_date}</p>
        </div>

      ))}
    </div>
  )
}

export default StudyTopicVisualizer
