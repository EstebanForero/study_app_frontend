import StudyTopicVisualizer from "./components/studyTopicVisualizer"

function App() {
  return (
    <div className="bg-gray-800 w-full h-screen p-4">
      <h1 className="text-white text-center text-2xl font-bold">Study app</h1>
      <p className="text-white font-semibold text-lg mb-3 ml-3">Your tasks</p>
      <StudyTopicVisualizer />
    </div>
  )
}

export default App
