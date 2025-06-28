import Styles from './ColorButton.module.css';
import { useSelectedNote } from '../Notescontext';


export default function ColorButton(props) {
    
    const {handleColorChange} = useSelectedNote()
 
    return (
        <button onClick={() => handleColorChange(props.color.id)} className={Styles.colorButon} style={{ backgroundColor: props.color.headerColor }}></button>
    );
}
