import NotesScreen from "./components/NotesScreen/NotesScreen"
import { NoteProvider } from "./components/Notescontext"

function App() {
  
  return (
    <>
      <NoteProvider>
        <NotesScreen />
      </NoteProvider>
    </>
  )
}

export default App
