import { useMutation, useQueryClient } from "@tanstack/react-query"
import { StudySession } from "../backend/entities"
import { completeStudySession } from "../backend/backend"

type Props = {
  studySession: StudySession,
  subject_name: string
}

const StudySessionComponent = ({ studySession, subject_name }: Props) => {

  const queryClient = useQueryClient()

  const completeStudySessionMutation = useMutation({
    mutationFn: completeStudySession,
    onMutate: async (studyTopicId) => {
      queryClient.cancelQueries({ queryKey: [`study-session-${subject_name}`] })
      const previousStudySessions = queryClient.getQueryData([`study-session-${subject_name}`])

      queryClient.setQueryData([`study-session-${subject_name}`], (old: StudySession[]) => old.filter(studySession => studySession.id !== studyTopicId))

      return { previousStudySessions }
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData([`study-session-${subject_name}`], context?.previousStudySessions)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [`study-session-${subject_name}`] })
    }
  })


  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow-black shadow-lg border border-green-500 ">
      <h1 className="text-white font-semibold text-xl">{studySession.study_topic_name}</h1>
      <h1 className="text-white mb-4">{
        studySession.days_passed > 1 ? `You are ${studySession.days_passed} days late` : 'For today'
      }</h1>
      <button className="text-white bg-green-500 rounded-xl py-1 px-2 hover:bg-green-700 transition-colors duration-100"
        onClick={() => completeStudySessionMutation.mutate(studySession.id)}
      >Complete study session</button>
    </div>
  )
}

export default StudySessionComponent
