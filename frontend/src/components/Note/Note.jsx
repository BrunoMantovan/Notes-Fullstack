import { useEffect, useRef, useState } from 'react'
import styles from './note.module.css'
import Trash from "../../assets/Svg/Trash"
import Archive from '../../assets/Svg/archive'
import {updateNoteFunction} from '../../services/notesApi'

export default function note(props) {

    useEffect(() => {
        onGrow()
    }, [])
    const [isArchived, setIsArchived] = useState(props.isArchived || false)
    const [content, setContent] = useState(props.content || "")
    const [color, setColor] = useState(props.color)
    const [position, setPosition] = useState(props.position)

    let mousePos = { x: 0, y: 0 }
    const cardRef = useRef(null)
    const textareaRef = useRef(null)
    const positionRef = useRef(position)

    const onMouseClick = (e) =>{
        mousePos.x = e.clientX
        mousePos.y = e.clientY
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }

    const onMouseMove = (e) =>{
        const mouseMoveDir = {
            x: mousePos.x - e.clientX,
            y: mousePos.y - e.clientY
        }
        mousePos.x = e.clientX
        mousePos.y = e.clientY
        trackPosition({
            x: cardRef.current.offsetLeft - mouseMoveDir.x,
            y: cardRef.current.offsetTop - mouseMoveDir.y
        })
    }

    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
        updateNote()
    }

    const trackPosition = (newPos) => {
        positionRef.current = newPos
        setPosition(newPos)
    };

    const onGrow = (e) => {
        textareaRef.current.style.height = "auto"
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }

    const updateNote = async () =>{
        const noteChanges = {
            content: textareaRef.current.value,
            color: color,
            position: positionRef.current,
            isArchived: isArchived,
        }
        console.log("Updating note with changes: ", noteChanges);
        
        try {
            await updateNoteFunction(noteChanges, props.id)
        } catch (e) {
            console.error("Error updating note:", e)
        }
    }

  return (
    <div className={styles.note} ref={cardRef} style={{backgroundColor: props.color.bgColor, left: `${position.x}px`, top: `${position.y}px`}}>
        <header className={styles.header} style={{backgroundColor: props.color.headerColor}} onMouseDown={onMouseClick}>
            <button className={styles.deleteButton} onClick={() =>props.onDelete(props.id)}><Archive/></button>
            <p>{props.createdAt ? new Date(props.createdAt).toLocaleString(undefined, {day: '2-digit', month: '2-digit', year: '2-digit'}) : ""}</p>
            <button className={styles.deleteButton} onClick={() =>props.onDelete(props.id)}><Trash/></button>
        </header>
        <textarea rows={3} ref={textareaRef} onInput={onGrow} defaultValue={props.content}>
            
        </textarea>
    </div>
  )
}
