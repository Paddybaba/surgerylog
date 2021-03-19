import tachyons from 'tachyons'
import styles from '../Components/Components.module.css'

const NewPatient = ({gotoAddNew}) =>{
    return (
        
        <div className={styles.card} onClick={()=>{gotoAddNew();console.log("Button clicked")}}>
            <img src={"/images/addpatient.png"} className="w-50 mt2"></img>
            <h3 className="f6 tc">Add New Patient</h3>
        </div>
       
    )
}
export default NewPatient