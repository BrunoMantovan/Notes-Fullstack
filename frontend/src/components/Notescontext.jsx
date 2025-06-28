import { createContext, useContext, useState, useEffect } from "react";
import { getNotes, createNoteFunction, deleteNotes, changeArchiveStatus, changeColor } from "../services/notesApi";

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
        const notes = await createNoteFunction(displayArchived)
        setNotesArray(notes);
    }

    const onDeleteNote = async (id) =>{
        await deleteNotes(id)
        setNotesArray((prevState) =>
        prevState.filter((note) => note._id !== id)
        );
    }

    const onHandleArchive = async (id, isArchived) =>{
        await changeArchiveStatus(id, isArchived)
        setNotesArray((prevState) =>
        prevState.filter((note) => note._id !== id)
        );
    }

    const handleColorChange = async (colorId) => {
        if(!selectedNote){return}
        const note = notesArray.find((note) => note._id === selectedNote)
        if (note && note.color.id === colorId) return
        const newColor = await changeColor(colorId, selectedNote)
        setNotesArray((prevNotes) => prevNotes.map((note) => note._id === selectedNote ? { ...note, color: newColor.color } : note));
    }

    return (
        <NoteContext.Provider value={{selectedNote, setSelectedNote, notesArray, setNotesArray, handleAddNote, onDeleteNote, onHandleArchive, displayArchived, setDisplayArchived, handleColorChange}}>
            {children}
        </NoteContext.Provider>
    )
}

export function useSelectedNote() {
  return useContext(NoteContext);
}