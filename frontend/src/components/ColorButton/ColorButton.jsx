import Styles from './ColorButton.module.css';

export default function ColorButton(props) {
  const changeColor = () => {
        console.log("CHange color clicked:", color);
    };
 
    return (
        <button onClick={changeColor} className={Styles.colorButon} style={{ backgroundColor: props.color.headerColor }}></button>
    );
}
