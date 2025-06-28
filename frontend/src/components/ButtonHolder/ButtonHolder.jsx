import styles from './ButtonHolder.module.css'
import Add from '../../assets/Svg/Add'
import colors from '../../assets/colors.json'
import ColorButton from '../ColorButton/ColorButton'
import ShowArchive from '../../assets/Svg/ShowArchive'
import UnshowArchive from '../../assets/Svg/UnshowArchive'
import { useSelectedNote } from "../Notescontext";


export default function buttonHolder() {
  
  const {handleAddNote, displayArchived, setDisplayArchived} = useSelectedNote();

  return (
    <section className={styles.container}>
      <button onClick={handleAddNote}><Add/></button>
      {colors.map((color) => (
        <ColorButton key={color.id} color={color} />
      ))}
      <button onClick={()=>setDisplayArchived(!displayArchived)}>{displayArchived ? <UnshowArchive/> : <ShowArchive/>}</button>
    </section>
  )
}