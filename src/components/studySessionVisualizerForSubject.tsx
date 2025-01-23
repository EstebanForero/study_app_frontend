
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
      {studySessions?.length == 0 && <div className='flex flex-col justify-center items-center w-full'>
        <h1 className='text-white mb-8'>
          !Congratulations, You already completed all of your study sessions
        </h1>
        <p className='text-3xl'>
          🎉🎊🥳
        </p>
      </div>}
    </div>
  )
}

export default StudySessionVisualizerForSubject
