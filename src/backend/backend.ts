import ky from "ky"
import { StudyTopic, StudyTopicInfo } from "./entities"

const localUrl = "http://localhost:3000"
const baseUrl = localUrl

export async function getStudyTopics(): Promise<StudyTopic[]> {
  return await ky.get('study_topics', { prefixUrl: baseUrl }).json()
}

export async function addStudyTopic(studyTopicInfo: StudyTopicInfo) {
  console.log(`sending add study topic request: ${JSON.stringify(studyTopicInfo)}`)

  return await ky.post('study_topic', {
    prefixUrl: baseUrl,
    json: studyTopicInfo
  })
}

export async function deleteStudyTopic(topicId: number) {
  console.log(`sending delete study topic request: ${JSON.stringify(topicId)}`)

  return await ky.delete(`study_topic/${topicId}`, { prefixUrl: baseUrl })
}

export async function getStudyTopicsForToday(): Promise<StudyTopic[]> {

  return await ky.get(`study_topics_today`, { prefixUrl: baseUrl }).json()
}
