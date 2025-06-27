import { useEffect, useState } from 'react'
import Note from './components/note/note'
import CreateNote from './components/CreateNote/CreateNote'
import { v4 as uuidv4 } from 'uuid';
import colors from './assets/colors.json'
import { createNotes, getNotes } from './services/notesApi';

function App() {
  
  const [notesArray, setNotesArray] = useState([])
  useEffect(() => {

    const fetchNotes = async ()=>{
      try {
        const notes = await getNotes()
        console.log("Fetched notes: ", notes);
        
        setNotesArray(notes)

      } catch (e) {
        console.error("Error fetching notes:", e)
      }
    } 
    fetchNotes()
  }, [])

  const handleAddNote = async () =>{
    /* setNotesArray((prevNotes) => [
      ...prevNotes, {id: uuidv4(), date: new Date().toLocaleDateString(), color: colors[1], content: "", position: {x: 205, y: 300} }
    ]) */
    const newNote ={
      content: " ",
      color: {bgColor: colors[0].bgColor, headerColor: colors[0].headerColor},
      position: {x: 205, y: 300},
    }
    console.log(newNote);
    
    try{
      await createNotes(newNote)
      const notes = await getNotes();
      setNotesArray(notes);
    } catch (e) {
      console.error("Error creating note:", e)
    }
  }
  const onDeleteNote = (id) =>{
    setNotesArray((prevNotes) => prevNotes.filter(note => note._id !== id))
    console.log(notesArray)
  }
  return (
    <>
      <h1 style={{textAlign:"center"}}>Ensolvers Challenge</h1>
      <CreateNote onAddNote={handleAddNote} />
      {notesArray.map(note => (
        <Note key={note._id} id={note._id} color={note.color} onDelete={onDeleteNote} date={note.date} position={note.position}/>
      ))}
    </>
  )
}

export default App
