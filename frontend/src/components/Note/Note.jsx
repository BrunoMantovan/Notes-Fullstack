import { useEffect, useRef, useState } from 'react'
import styles from './note.module.css'
import Trash from "../../assets/Svg/Trash"
import Archive from '../../assets/Svg/archive'
import Unarchvie from '../../assets/Svg/Unarchvie'
import Spinner from '../../assets/Svg/Spinner'
import {updateNoteFunction} from '../../services/notesApi'
import { noteMoveOffset, onGrow } from '../../utils'
import { useSelectedNote } from '../Notescontext'

export default function note(props) {

    const {selectedNote, setSelectedNote, onDeleteNote, onHandleArchive} = useSelectedNote()

    useEffect(() => {
        onGrow(textareaRef.current);  
    }, []);
    
    const [color, setColor] = useState(props.color)
    const [position, setPosition] = useState(props.position)
    const [updating, setUpdating] = useState(false)
    const typingTimer = useRef(null)
    const id = props.id
    const isArchived = props.isArchived

    let mousePos = { x: 0, y: 0 }
    const noteRef = useRef(null)
    const textareaRef = useRef(null)
    const positionRef = useRef(position)

    const onMouseClick = (e) =>{
        mousePos.x = e.clientX
        mousePos.y = e.clientY
        setSelectedNote(id)
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
        const newPosition = noteMoveOffset(noteRef.current, mouseMoveDir)
        trackPosition(newPosition)
    }
    
    const trackPosition = (newPos) => {
        positionRef.current = newPos
        setPosition(newPos)
    }
    
    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
        updateNote()
    }

    const updateNote = async () =>{
        const noteChanges = {
            content: textareaRef.current.value,
            color: color,
            isArchived: isArchived,
            position: positionRef.current,
        }
        console.log("Updating note with changes: ", noteChanges);
        
        try {
            await updateNoteFunction(noteChanges, id)
        } catch (e) {
            console.error("Error updating note:", e)
        }
        setUpdating(false)
    }

    const handleKeyUp = () =>{
        setUpdating(true)

        typingTimer.current && clearTimeout(typingTimer.current)

        typingTimer.current = setTimeout(() => {
            updateNote()
        }, 2000)
    }


  return (
    <div className={`${styles.note} note`} ref={noteRef} style={{backgroundColor: props.color.bgColor, left: `${position.x}px`, top: `${position.y}px`, zIndex: selectedNote === id ? 10 : 1}}>
        <header className={styles.header} style={{backgroundColor: props.color.headerColor}} onMouseDown={onMouseClick}>
            <button className={styles.button} onClick={() =>onHandleArchive(id, isArchived)}>{isArchived ? <Unarchvie/> : <Archive/>}</button>
            <p>{props.createdAt ? new Date(props.createdAt).toLocaleString(undefined, {day: '2-digit', month: '2-digit', year: '2-digit'}) : ""}</p>
            <button className={styles.button} onClick={() =>onDeleteNote(id)}>
                <Trash/>
                {updating && <Spinner/>}
            </button>
        </header>
        <textarea rows={3} ref={textareaRef} onInput={e => onGrow(e.target)} defaultValue={props.content} onFocus={() => setSelectedNote(id)} onKeyUp={handleKeyUp} style={{color: "#18181A"}}>
            
        </textarea>
    </div>
  )
}
