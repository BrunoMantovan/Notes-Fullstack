

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
    const notes = await res.json()
    return notes
}