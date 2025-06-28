export const noteMoveOffset = (note, mouseMoveDir = {x: 0, y: 0}) => {
    const offsetLeft = note.offsetLeft - mouseMoveDir.x
    const offsetTop = note.offsetTop - mouseMoveDir.y

    return {
        x: offsetLeft < 0 ? 0 : offsetLeft,
        y: offsetTop < 0 ? 0 : offsetTop
    }
}

export function onGrow(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

export const setFrontNote = (selectedNote) =>{
    selectedNote.style.zIndex = 1000

    Array.from(document.querySelectorAll('.note')).forEach(note => {
        if(note !== selectedNote){
            note.style.zIndex = selectedNote.style.zIndex - 1
        }
    })
}