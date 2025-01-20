import ky from "ky"
import { StudyTopic, StudyTopicInfo } from "./entities"

const localUrl = "localhost:3000"
const baseUrl = localUrl

export async function getStudyTopics(): Promise<StudyTopic[]> {
  return await ky('/study_topics', { prefixUrl: baseUrl }).json()
}

export async function addStudyTopic(studyTopicInfo: StudyTopicInfo): Promise<StudyTopic[]> {
  return await ky.post('/study_topic', {
    prefixUrl: baseUrl,
    json: studyTopicInfo
  }).json()
}
