import StudyTopicTodayVisualizer from "./components/studyTopicTodayVisualizer"
import StudyTopicVisualizer from "./components/studyTopicVisualizer"

function App() {
  return (
    <div className="bg-gray-800 w-full h-screen p-4">
      <h1 className="text-white text-center text-2xl font-bold">Study app</h1>
      <p className="text-white font-semibold text-lg mb-3 ml-3">Your study topics</p>
      <StudyTopicVisualizer />
      <p className="text-white font-semibold text-lg mb-3 ml-3 mt-10">Today you have to study this topics</p>
      <StudyTopicTodayVisualizer />
    </div>
  )
}

export default App
