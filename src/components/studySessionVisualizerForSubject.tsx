
import { useQuery } from '@tanstack/react-query'
import { getStudySessionsForSubject } from '../backend/backend'
import StudySessionComponent from './studySessionComponent'

type Props = {
  subject: string
}

const StudySessionVisualizerForSubject = ({ subject }: Props) => {

  const { data: studySessions } = useQuery({
    queryKey: [`study-session-${subject}`],
    queryFn: async () => await getStudySessionsForSubject(subject)
  })

  return (
    <div className='flex flex-row flex-wrap gap-4'>
      {studySessions?.map(studySession => (<StudySessionComponent studySession={studySession} subject_name={subject} />))}
    </div>
  )
}

export default StudySessionVisualizerForSubject
