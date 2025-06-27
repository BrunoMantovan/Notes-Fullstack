import { useEffect, useRef, useState } from 'react'
import styles from './note.module.css'
import Trash from "../../assets/Svg/Trash"

export default function note(props) {

    useEffect(() => {
        onGrow()
    }, [])

    const [position, setPosition] = useState(props.position)
    let mousePos = { x: 0, y: 0 }
    const cardRef = useRef(null)
    const textareaRef = useRef(null)

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
        setPosition({
            x: cardRef.current.offsetLeft - mouseMoveDir.x,
            y: cardRef.current.offsetTop - mouseMoveDir.y
        })
    }

    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
    }
    const onGrow = (e) => {
        textareaRef.current.style.height = "auto"
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }


  return (
    <div className={styles.note} ref={cardRef} style={{backgroundColor: props.color.bgColor, left: `${position.x}px`, top: `${position.y}px`}}>
        <header className={styles.header} style={{backgroundColor: props.color.headerColor}} onMouseDown={onMouseClick}>
            <p>{props.date}</p>
            <button className={styles.deleteButton} onClick={() =>props.onDelete(props.id)}><Trash/></button>
        </header>
        <textarea rows={3} ref={textareaRef} onInput={onGrow}>
            
        </textarea>
    </div>
  )
}
