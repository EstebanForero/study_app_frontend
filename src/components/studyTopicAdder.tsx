import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addStudyTopic, getSubjects } from "../backend/backend"
import { StudyTopic, StudyTopicInfo } from "../backend/entities"
import { useState } from "react"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown"
const StudyTopicAdder = () => {

  const queryClient = useQueryClient()

  const [studyTopicInfo, setStudyTopicInfo] = useState<StudyTopicInfo>({
    name: '',
    description: ''
  })

  const { data: subjects } = useQuery({
    queryKey: ["subjects"],
    queryFn: getSubjects
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
    <div className="bg-gray-900 w-96 rounded-xl shadow-black shadow-lg p-4 flex-col flex-shrink-0 md:h-60">
      <input placeholder="Task name" value={studyTopicInfo.name} className="text-white bg-gray-800 w-full p-3 rounded-xl outline-none mb-4"
        onChange={(e) => setStudyTopicInfo({
          ...studyTopicInfo,
          name: e.target.value
        })}
      />
      <textarea placeholder="description" value={studyTopicInfo.description ?? ''} className="text-white bg-gray-800 w-full p-3 rounded-xl outline-none mb-1 grow"
        onChange={(e) => setStudyTopicInfo({
          ...studyTopicInfo,
          description: e.target.value
        })}
      />
      <div className="flex flex-col md:flex-row gap-4">
        <Dropdown placement="top-start">
          <DropdownTrigger>
            <button className="text-white bg-blue-500 rounded-xl p-2 w-full">{studyTopicInfo.subject_name}</button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions" className="bg-gray-950 p-2 pr-28 rounded-xl"
            selectionMode="single"
            onSelectionChange={(selections) => {
              if (selections.currentKey != null) {
                setStudyTopicInfo({
                  ...studyTopicInfo,
                  subject_name: selections.currentKey
                })
              }
            }}
          >
            {subjects?.map(subject => (<DropdownItem key={subject.subject_name} className="text-white hover:bg-gray-800 w-full rounded-sm">
              {subject.subject_name}</DropdownItem>)) ?? <DropdownItem key={"nothing"}>Nothing still</DropdownItem>}
          </DropdownMenu>
        </Dropdown>
        <button className="bg-green-500 w-full rounded-xl py-2" onClick={() => addTopicMutation.mutate(studyTopicInfo)}>Add task</button>
      </div>
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
