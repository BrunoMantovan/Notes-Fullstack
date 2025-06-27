import styles from './CreateNote.module.css'
import Add from '../../assets/Svg/Add'
import colors from '../../assets/colors.json'
import ColorButton from '../ColorButton/ColorButton'


export default function CreateNote(props) {
  return (
    <section className={styles.container}>
        <button onClick={props.onAddNote}><Add/></button>
        {colors.map((color) => (
                <ColorButton key={color.id} color={color} />
            ))}
    </section>
  )
}