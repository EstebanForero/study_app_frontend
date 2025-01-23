
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Subject } from '../backend/entities'
import { deleteSubject } from '../backend/backend'

type Props = {
  subject: Subject
}

const SubjectComponent = ({ subject }: Props) => {

  const queryClient = useQueryClient()

  const deleteSubjectMutation = useMutation({
    mutationFn: deleteSubject,
    onMutate: async (subject_name) => {
      queryClient.cancelQueries({ queryKey: ["subjects"] })
      const previousStudyTopics = queryClient.getQueryData(["subjects"])

      queryClient.setQueryData(["subjects"], (old: Subject[]) => old.filter(subject => subject.subject_name !== subject_name))

      return { previousStudyTopics }
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(["subjects"], context?.previousStudyTopics)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] })
      queryClient.invalidateQueries({ queryKey: ["studyTopics"] })
    }
  })

  return (
    <div className='flex flex-row gap-1'>
      <p
        className='text-white px-4 py-2 bg-blue-500 rounded-tl-xl rounded-bl-xl'
      >{subject.subject_name}</p>
      <button className='text-white bg-red-500 rounded-tr-xl rounded-br-xl px-2 py-2'
        onClick={() => deleteSubjectMutation.mutate(subject.subject_name)}
      >X</button>
    </div>
  )
}

export default SubjectComponent
