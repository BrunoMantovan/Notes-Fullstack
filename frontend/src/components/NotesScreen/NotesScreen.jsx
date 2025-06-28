import Note from '../note/note'
import CreateNote from "../ButtonHolder/ButtonHolder";
import { useSelectedNote } from "../Notescontext";

export default function NotesScreen() {
  
  const { notesArray, displayArchived } = useSelectedNote();  

  return (
    <>
      <CreateNote />
      {notesArray.filter(e => e.isArchived === displayArchived).map(note => (
        <Note key={note._id} id={note._id} isArchived={note.isArchived} color={note.color} createdAt={note.createdAt} position={note.position} content={note.content}/>
      ))}
    </>
  )
}
