
export type StudyTopic = {
  id: number,
  name: string,
  description: string | null,
  creation_date: string
}

export type StudyTopicInfo = {
  name: string,
  description: string | null,
}

export type Subject = {
  subject_name: string
}

export type StudySession = {
  id: number,
  study_topic_name: string,
  days_passed: number,
}
