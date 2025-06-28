import { useState } from "react";
import { deleteNotes, changeArchiveStatus } from "../../services/notesApi";
import Note from '../note/note'
import CreateNote from "../ButtonHolder/ButtonHolder";
import { useSelectedNote } from "../Notescontext";

export default function NotesScreen() {
  
  const { notesArray, setNotesArray, displayArchived } = useSelectedNote();  

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

  return (
    <>
      <CreateNote />
      {notesArray.filter(e => e.isArchived === displayArchived).map(note => (
        <Note key={note._id} id={note._id} onArchive={onHandleArchive} isArchived={note.isArchived} color={note.color} onDelete={onDeleteNote} createdAt={note.createdAt} position={note.position} content={note.content}/>
      ))}
    </>
  )
}
