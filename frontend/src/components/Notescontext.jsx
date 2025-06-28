import { createContext, useContext, useState, useEffect } from "react";
import { getNotes, createNoteFunction } from "../services/notesApi";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
    const [selectedNote, setSelectedNote] = useState(null);
    const [notesArray, setNotesArray] = useState([])
    const [displayArchived, setDisplayArchived] = useState(false)

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
    }, [displayArchived])

    const handleAddNote = async () => {
        const notes = await createNoteFunction()
        setNotesArray(notes);
    }

    return (
        <NoteContext.Provider value={{selectedNote, setSelectedNote, notesArray, setNotesArray, handleAddNote, displayArchived, setDisplayArchived}}>
            {children}
        </NoteContext.Provider>
    )
}

export function useSelectedNote() {
  return useContext(NoteContext);
}