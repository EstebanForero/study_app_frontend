
import { useQuery } from '@tanstack/react-query'
import { getSubjects } from '../backend/backend'
import SubjectAdder from './subjectAdder'

const SubjectVisualizer = () => {

  const { data: subjects } = useQuery({
    queryKey: ['subjects'],
    queryFn: getSubjects
  })

  return (
    <div className='flex flex-row my-4'>
      {subjects?.map(subject => <p className='text-white px-4 py-2 bg-blue-500'>{subject.subject_name}</p>)}
      <SubjectAdder />
    </div>
  )
}

export default SubjectVisualizer
