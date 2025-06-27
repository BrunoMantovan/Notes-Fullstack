import { useState, useEffect } from "react";
import { createNoteFunction, deleteNotes, getNotes } from "../../services/notesApi";
import Note from '../note/note'
import CreateNote from "../CreateNote/CreateNote";

export default function NotesScreen() {
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
  
    const handleAddNote = async () => {
      const notes = await createNoteFunction()
      setNotesArray(notes);
    }
    const onDeleteNote = async (id) =>{
      await deleteNotes(id)
      const notes = await getNotes();
      setNotesArray(notes);
    }
    return (
      <>
        <CreateNote onAddNote={handleAddNote} />
        {notesArray.map(note => (
          <Note key={note._id} id={note._id} color={note.color} onDelete={onDeleteNote} createdAt={note.createdAt} position={note.position} content={note.content}/>
        ))}
      </>
    )
}
