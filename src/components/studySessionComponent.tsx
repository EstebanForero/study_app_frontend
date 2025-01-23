import { StudySession } from "../backend/entities"

type Props = {
  studySession: StudySession
}

const StudySessionComponent = ({ studySession }: Props) => {
  return (
    <div>
      <h1 className="text-white">{studySession.study_topic_name}</h1>
      <h1 className="text-white">{studySession.days_passed}</h1>
    </div>
  )
}

export default StudySessionComponent
