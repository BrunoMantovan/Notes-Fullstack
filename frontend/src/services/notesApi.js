import colors from '../assets/colors.json'

export const getNotes = async () => {
  const res = await fetch("http://localhost:3000/api/notes")
  const notes = await res.json()
  return notes
}

export const createNotes = async (notePayload) => {
  const res = await fetch("http://localhost:3000/api/notes",{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(notePayload)
  })
  const createdNotes = await res.json()
  return createdNotes
}

export const createNoteFunction = async (isArchived, initialPosition) =>{
  const newNote ={
    content: "",
    color: {id: colors[0].id, bgColor: colors[0].bgColor, headerColor: colors[0].headerColor, footerColor: colors[0].footerColor},
    isArchived: isArchived,
    position: initialPosition,
    categories: []
  }
    
  try{
    await createNotes(newNote)
    return await getNotes();
  } catch (e) {
    console.error("Error creating note:", e)
  }
}

export const updateNotes = async (noteUpdatePayload, id) => {
const res = await fetch(`http://localhost:3000/api/notes/${id}`,{
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(noteUpdatePayload)
})
const updatedNotes = await res.json()
return updatedNotes
}

export const changeColor = async (colorId, id) => {
  const colorIndex = colors.findIndex(color => color.id === colorId)  
  
  const updatedNote ={
    color: {
      id: colors[colorIndex].id,
      bgColor: colors[colorIndex].bgColor,
      headerColor: colors[colorIndex].headerColor,
      footerColor: colors[colorIndex].footerColor
    }
  }

  try{
    await updateNotes(updatedNote, id)
    return updatedNote
  } catch (e) {
    console.error("Error updating note:", e)
  }
}

export const updateCategory = async (categories, id) => {
    console.log("categories in api.js ", categories)
  const updatedNote ={
    categories: categories
  }

  try{
    await updateNotes(updatedNote, id)
    return updatedNote
  } catch (e) {
    console.error("Error updating note:", e)
  }
}

export const updateNoteFunction = async (changes, id) =>{
  const updatedNote ={
    content: changes.content,
    color: changes.color,
    position: changes.position,
    isArchived: changes.isArchived,
    createdAt: changes.createdAt,
  }
    
  try{
    await updateNotes(updatedNote, id)
  } catch (e) {
    console.error("Error updating note:", e)
  }
}

export const changeArchiveStatus = async (id, isArchived) => {
  const updatedNote ={
    isArchived: !isArchived,
  }
    
  try{
    await updateNotes(updatedNote, id)
  } catch (e) {
    console.error("Error updating note:", e)
  }
}

export const deleteNotes = async (id) => {
  const res = await fetch(`http://localhost:3000/api/notes/${id}`,{
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const deletedNotes = await res.json()
  return deletedNotes
}








