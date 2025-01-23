
import { useQuery } from '@tanstack/react-query'
import { getSubjects } from '../backend/backend'
import SubjectAdder from './subjectAdder'
import SubjectComponent from './subject'

const SubjectVisualizer = () => {

  const { data: subjects } = useQuery({
    queryKey: ['subjects'],
    queryFn: getSubjects
  })

  return (
    <div className='flex flex-row my-4 gap-4'>
      {subjects?.map(subject => <SubjectComponent key={subject.subject_name} subject={subject} />)}
      <SubjectAdder />
    </div>
  )
}

export default SubjectVisualizer
