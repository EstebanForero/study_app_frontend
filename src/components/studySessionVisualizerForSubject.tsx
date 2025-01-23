
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getStudySessionsForSubject } from '../backend/backend'

type Props = {
  subject: string
}

const StudySessionVisualizerForSubject = ({ subject }: Props) => {

  const { data: studySessions } = useQuery({
    queryKey: [`study-session-${subject}`],
    queryFn: getStudySessionsForSubject
  })

  return (
    <div>
      {}
    </div>
  )
}

export default StudySessionVisualizerForSubject
