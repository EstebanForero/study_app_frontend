import ky from "ky";
import { StudyTopic, StudyTopicInfo, Subject, StudySession } from "./entities";

//const remoteUrl = "https://study-app-backend.fly.dev";
const localUrl = "http://localhost:3000"
const baseUrl = localUrl;

// Fetch all study topics
export async function getStudyTopics(): Promise<StudyTopic[]> {
  return await ky.get("study_topics", { prefixUrl: baseUrl }).json();
}

// Add a new study topic
export async function addStudyTopic(studyTopicInfo: StudyTopicInfo) {
  console.log(`Sending add study topic request: ${JSON.stringify(studyTopicInfo)}`);
  return await ky.post("study_topic", {
    prefixUrl: baseUrl,
    json: studyTopicInfo,
  });
}

// Delete a study topic
export async function deleteStudyTopic(topicId: number) {
  console.log(`Sending delete study topic request: ${JSON.stringify(topicId)}`);
  return await ky.delete(`study_topic/${topicId}`, { prefixUrl: baseUrl });
}

// Fetch study topics for today
export async function getStudyTopicsForToday(): Promise<StudyTopic[]> {
  return await ky.get("study_topics_today", { prefixUrl: baseUrl }).json();
}

// Fetch all subjects
export async function getSubjects(): Promise<Subject[]> {
  return await ky.get("subjects", { prefixUrl: baseUrl }).json();
}

// Add a new subject
export async function addSubject(subjectName: string) {
  console.log(`Sending add subject request: ${subjectName}`);
  return await ky.post(`subject/${encodeURIComponent(subjectName)}`, { prefixUrl: baseUrl });
}

// Fetch study topics for a specific subject
export async function getStudyTopicsForSubject(subjectName: string): Promise<StudyTopic[]> {
  return await ky.get(`study_topic/subject/${encodeURIComponent(subjectName)}`, {
    prefixUrl: baseUrl,
  }).json();
}

// Fetch study sessions for a specific subject
export async function getStudySessionsForSubject(
  subjectName: string
): Promise<StudySession[]> {
  return await ky.get(`study_session/${encodeURIComponent(subjectName)}`, {
    prefixUrl: baseUrl,
  }).json();
}

// Complete a study session
export async function completeStudySession(studySessionId: number) {
  console.log(`Sending complete study session request: ${studySessionId}`);
  return await ky.post(`study_session/complete/${studySessionId}`, { prefixUrl: baseUrl });
}

