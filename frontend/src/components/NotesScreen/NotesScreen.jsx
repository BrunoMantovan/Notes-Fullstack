import Note from '../note/note'
import CreateNote from "../ButtonHolder/ButtonHolder";
import { useSelectedNote } from "../Notescontext";
import { useState } from 'react';
import Header from '../Header/Header';

export default function NotesScreen() {
  
  const { notesArray, displayArchived } = useSelectedNote();  
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredNotes = notesArray
    .filter(e => e.isArchived === displayArchived)
    .filter(note => 
      !categoryFilter.trim() ||
      note.categories?.some(cat => cat.toLowerCase().includes(categoryFilter.trim().toLowerCase()))
    );

  return (
    <>
      <Header setCategoryFilter={setCategoryFilter} categoryFilter={categoryFilter}/>
      <CreateNote />
      {filteredNotes.map(note => (
        <Note key={note._id} id={note._id} categories={note.categories} isArchived={note.isArchived} color={note.color} createdAt={note.createdAt} position={note.position} content={note.content}/>
      ))}
    </>
  )
}
