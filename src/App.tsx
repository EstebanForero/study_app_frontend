import StudySessionVisualizer from "./components/studySessionVisualizer"
import StudyTopicVisualizer from "./components/studyTopicVisualizer"
import SubjectVisualizer from "./components/subjectVisualizer"

function App() {
  return (
    <div className="bg-gray-800 w-full min-h-screen h-full p-4">
      <h1 className="text-white text-center text-2xl font-bold">Study app</h1>
      <h1 className="text-white font-semibold text-lg ml-3">Your subjects</h1>
      <SubjectVisualizer />
      <p className="text-white font-semibold text-lg mb-3 ml-3">Your study topics</p>
      <StudyTopicVisualizer />
      <p className="text-white font-semibold text-lg mb-3 ml-3 mt-10">Your study sessions</p>
      <StudySessionVisualizer />
    </div>
  )
}

export default App
