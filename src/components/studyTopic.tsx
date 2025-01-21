import { useMutation, useQueryClient } from "@tanstack/react-query"
import { StudyTopic } from "../backend/entities"
import { deleteStudyTopic } from "../backend/backend"

type Props = {
  studyTopic: StudyTopic
}

const StudyTopicComponent = ({ studyTopic }: Props) => {

  const queryClient = useQueryClient()

  const deleteTopicMutation = useMutation({
    mutationFn: deleteStudyTopic,
    onMutate: async (studyTopicId) => {
      queryClient.cancelQueries({ queryKey: ["studyTopics"] })
      const previousStudyTopics = queryClient.getQueryData(["studyTopics"])

      queryClient.setQueryData(["studyTopics"], (old: StudyTopic[]) => old.filter(studyTopic => studyTopic.id !== studyTopicId))

      return { previousStudyTopics }
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(["studyTopics"], context?.previousStudyTopics)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["studyTopicsToday"] })
    }
  })

  return (
    <div className="bg-gray-900 w-96 h-60 rounded-xl shadow-black shadow-lg p-4 flex flex-col flex-shrink-0 mb-6" key={studyTopic.id} >
      <div className="flex flex-row justify-between">
        <h2 className="text-white text-lg font-semibold ml-3">{studyTopic.name}</h2>
        <button className="bg-red-600 rounded-xl px-2 text-white"
          onClick={() => deleteTopicMutation.mutate(studyTopic.id)}
        >Delete</button>
      </div>
      <p className="text-white grow bg-gray-800 rounded-xl p-4 my-4">{studyTopic.description ?? 'No description added to this topic'}</p>
      <p className="text-white ml-3">Created at: {studyTopic.creation_date}</p>
    </div >

  )
}

export default StudyTopicComponent  
