import { createContext, useContext, useState, useEffect } from "react";
import { getNotes, createNoteFunction, deleteNotes, changeArchiveStatus, changeColor, updateCategory } from "../services/notesApi";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
    const [selectedNote, setSelectedNote] = useState(null);
    const [notesArray, setNotesArray] = useState([])
    const [displayArchived, setDisplayArchived] = useState(false)
    const [initialPosition, setInitialPosition] = useState({x: 200, y: 400})

    useEffect(() => {
        fetchNotes()
    }, [displayArchived])

    const fetchNotes = async ()=>{
        try {
            const notes = await getNotes()
            console.log("Fetched notes: ", notes);
            
            setNotesArray(notes)

        } catch (e) {
            console.error("Error fetching notes:", e)
        }
    } 

    const handleAddNote = async () => {
        const notes = await createNoteFunction(displayArchived, initialPosition)
        const newInitialPosition = {x: initialPosition.x + 15, y: initialPosition.y - 20}
        setInitialPosition(newInitialPosition)
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
        const newColor = await changeColor(colorId, selectedNote)
        setNotesArray((prevNotes) => prevNotes.map((note) => note._id === selectedNote ? { ...note, color: newColor.color } : note));
    }

    const addCategory = async (updatedCategories, id) => {
        await updateCategory(updatedCategories, id);
        setNotesArray(prevNotes =>
        prevNotes.map(note =>
            note._id === id ? { ...note, categories: updatedCategories } : note
        ))
    }

    const removeCategory = async (updatedCategories, id) => {
        await updateCategory(updatedCategories, id);
        setNotesArray(prevNotes =>
        prevNotes.map(note =>
            note._id === id ? { ...note, categories: updatedCategories } : note
        ))
    }

    return (
        <NoteContext.Provider value={{selectedNote, setSelectedNote, notesArray, setNotesArray, handleAddNote, onDeleteNote, onHandleArchive, displayArchived, setDisplayArchived, handleColorChange, addCategory, removeCategory}}>
            {children}
        </NoteContext.Provider>
    )
}

export function useSelectedNote() {
  return useContext(NoteContext);
}