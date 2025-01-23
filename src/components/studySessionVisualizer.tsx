import { useQuery } from '@tanstack/react-query'
import { getSubjects } from '../backend/backend'
import StudySessionVisualizerForSubject from './studySessionVisualizerForSubject'

const StudySessionVisualizer = () => {

  const { data: subjects } = useQuery({
    queryKey: ['subjects'],
    queryFn: getSubjects
  })

  return (
    <div>
      {subjects?.map(subject => <div>
        <h1 className='text-white'>{subject.subject_name}</h1>
        <StudySessionVisualizerForSubject subject={subject.subject_name} />
      </div>)}
    </div>
  )
}

export default StudySessionVisualizer
