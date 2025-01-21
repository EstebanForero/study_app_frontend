import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addStudyTopic } from "../backend/backend"
import { StudyTopic, StudyTopicInfo } from "../backend/entities"
import { useState } from "react"

const StudyTopicAdder = () => {

  const queryClient = useQueryClient()

  const [studyTopicInfo, setStudyTopicInfo] = useState<StudyTopicInfo>({
    name: '',
    description: ''
  })

  const addTopicMutation = useMutation({
    mutationFn: addStudyTopic,
    onMutate: async (newStudyTopicInfo) => {
      queryClient.cancelQueries({ queryKey: ["studyTopics"] })
      const previousStudyTopics = queryClient.getQueryData(["studyTopics"])

      queryClient.setQueryData(["studyTopics"], (old: StudyTopic[]) => [...old, {
        id: Math.floor(Math.random() * 1000000),
        name: newStudyTopicInfo.name,
        description: newStudyTopicInfo.description,
        creation_date: getCurrentDate()
      }])

      return { previousStudyTopics }
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(["studyTopics"], context?.previousStudyTopics)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["studyTopics"] })
      queryClient.invalidateQueries({ queryKey: ["studyTopicsToday"] })
    }
  })

  return (


    <div className="bg-gray-900 w-96 h-60 rounded-xl shadow-black shadow-lg p-4 flex-row flex-shrink-0">
      <input placeholder="Task name" value={studyTopicInfo.name} className="text-white bg-gray-800 w-full p-3 rounded-xl outline-none mb-4"
        onChange={(e) => setStudyTopicInfo({
          ...studyTopicInfo,
          name: e.target.value
        })}
      />
      <textarea placeholder="description" value={studyTopicInfo.description ?? ''} className="text-white bg-gray-800 w-full p-3 rounded-xl outline-none mb-4 grow"
        onChange={(e) => setStudyTopicInfo({
          ...studyTopicInfo,
          description: e.target.value
        })}
      />
      <button className="bg-green-500 w-full rounded-xl py-2" onClick={() => addTopicMutation.mutate(studyTopicInfo)}>Add task</button>
    </div>
  )
}

function getCurrentDate(): string {
  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  return `${year}-${month}-${day}`;
}

export default StudyTopicAdder
