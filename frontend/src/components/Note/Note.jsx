import { useEffect, useRef, useState } from 'react'
import styles from './Note.module.css'
import Trash from "../../assets/Svg/Trash"
import Archive from '../../assets/Svg/Archive'
import Unarchvie from '../../assets/Svg/Unarchvie'
import Spinner from '../../assets/Svg/Spinner'
import Cross from '../../assets/Svg/Cross'
import {updateNoteFunction} from '../../services/notesApi'
import { noteMoveOffset, onGrow } from '../../utils'
import { useSelectedNote } from '../Notescontext'

export default function note(props) {

    const {selectedNote, setSelectedNote, onDeleteNote, onHandleArchive, addCategory, removeCategory} = useSelectedNote()

    useEffect(() => {
        onGrow(textareaRef.current);  
    }, []);
    
    const [position, setPosition] = useState(props.position)
    const [updating, setUpdating] = useState(false)
    const categories = props.categories;
    const [newCategory, setNewCategory] = useState("");
    const [showCategories, setShowCategories] = useState(false)
    const typingTimer = useRef(null)
    const color = props.color
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
            categories: categories
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

    const handleAddCategory = async () => {
        if (!newCategory.trim() || categories.includes(newCategory.trim())) return;
        const updatedCategories = [...categories, newCategory.trim()];
        setNewCategory("");
        
        await addCategory(updatedCategories, id);
    }

    const handleRemoveCategory = async (cat) => {
        const updatedCategories = categories.filter(c => c !== cat);
        await removeCategory(updatedCategories, id);
    }

  return (
    <div className={`${styles.note} note`} ref={noteRef} style={{backgroundColor: color.bgColor, left: `${position.x}px`, top: `${position.y}px`, zIndex: selectedNote === id ? 10 : 1, '--note-bg-color': color.bgColor, '--note-ft-color': color.footerColor}}>
        <header className={styles.header} style={{backgroundColor: color.headerColor}} onMouseDown={onMouseClick}>
            <button className={styles.button} onClick={() =>onHandleArchive(id, isArchived)}>{isArchived ? <Unarchvie/> : <Archive/>}</button>
            <p>{props.createdAt ? new Date(props.createdAt).toLocaleString(undefined, {day: '2-digit', month: '2-digit', year: '2-digit'}) : ""}</p>
            <button className={styles.button} onClick={() =>onDeleteNote(id)}>
                <Trash/>
                {updating && <Spinner/>}
            </button>
        </header>
        <textarea rows={3} ref={textareaRef} onInput={e => onGrow(e.target)} defaultValue={props.content} onFocus={() => setSelectedNote(id)} onKeyUp={handleKeyUp} style={{color: "#18181A"}}>
            
        </textarea>
        <footer className={`${styles.footer} ${showCategories ? styles.changeFooter : ''}`}>
            <section className={`${styles.innerFooter} ${showCategories ? styles.showInnerFooter : ''}`}>
                <div className={styles.categoryRow} >
                    <div className={styles.addCategory} style={{opacity: !showCategories ? 0 : 1 }}>
                        <input type="text" value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="Add category" onKeyDown={e => {if (e.key === "Enter") handleAddCategory()}}style={{backgroundColor: color.bgColor}}/>
                        <button onClick={handleAddCategory}>+</button>
                    </div>
                    <button className={styles.toggleCategoriesBtn} style={{transform: showCategories ? "rotate(180deg)" : "rotate(0deg)"}} onClick={() => setShowCategories(!showCategories)} title="Hide categories">
                        <Cross/>
                    </button>
                </div>
                <div className={styles.categories}>
                    {categories.map(cat => (
                        <button key={cat} className={styles.removeCategory} onClick={() => handleRemoveCategory(cat)} title="Remove category">
                            {cat}
                        </button>
                    ))}
                </div>
            </section>
        </footer>
    </div>
  )
}
