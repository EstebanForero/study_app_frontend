import { useQuery } from '@tanstack/react-query'
import { getSubjects } from '../backend/backend'
import StudySessionVisualizerForSubject from './studySessionVisualizerForSubject'

const StudySessionVisualizer = () => {

  const { data: subjects } = useQuery({
    queryKey: ['subjects'],
    queryFn: getSubjects
  })

  return (
    <div className=''>
      {subjects?.map(subject => <div className='bg-gray-700 rounded-xl p-4 mb-6'>
        <h1 className='text-white font-bold text-xl mb-4'>{subject.subject_name}</h1>
        <StudySessionVisualizerForSubject subject={subject.subject_name} />
      </div>)}
    </div>
  )
}

export default StudySessionVisualizer
