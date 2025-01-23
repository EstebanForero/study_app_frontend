
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { addSubject } from '../backend/backend'
import { FaTrash } from "react-icons/fa";
import { Subject } from '../backend/entities'

const SubjectAdder = () => {

  const [subjectName, setSubjectName] = useState("")

  const queryClient = useQueryClient()

  const addSubjectMutation = useMutation({
    mutationFn: addSubject,
    onMutate: async (subject_name: string) => {
      queryClient.cancelQueries({ queryKey: ["subjects"] })
      const previousStudyTopics = queryClient.getQueryData(["subjects"])

      queryClient.setQueryData(["subjects"], (old: Subject[]) => [...old, {
        subject_name: subject_name
      }])

      return { previousStudyTopics }
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(["subjects"], context?.previousStudyTopics)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] })
      queryClient.invalidateQueries({ queryKey: ["subjects"] })
    }
  })


  return (
    <div className='border-2 border-blue-600 rounded-xl'>
      <input value={subjectName} onChange={(e) => setSubjectName(e.target.value)} className='bg-gray-800 outline-none rounded-xl px-4 h-8 text-white w-60'
        placeholder='subject name'
      />
      <button className='bg-green-500 size-9 rounded-xl' onClick={() => addSubjectMutation.mutate(subjectName)}>+</button>
    </div>
  )
}

export default SubjectAdder
