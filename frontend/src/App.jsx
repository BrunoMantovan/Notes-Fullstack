import NotesScreen from "./components/NotesScreen/NotesScreen"
import { NoteProvider } from "./components/Notescontext"

function App() {
  
  return (
    <>
      <NoteProvider>
        <h1 style={{textAlign:"center"}}>Ensolvers Challenge</h1>
        <NotesScreen />
      </NoteProvider>
    </>
  )
}

export default App
