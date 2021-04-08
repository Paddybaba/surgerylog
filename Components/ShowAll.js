import styles from '../Components/Components.module.css'
var buttonLabel;
const ShowAll = ({showAllPatients, showRecent}) =>{
    if(showRecent){
        buttonLabel = "Show All Patients"
    }else{
        buttonLabel = "Show Recent"
    }
    return (
        
        <div className={styles.card} onClick={()=>{showAllPatients();console.log("Button clicked")}}>
            <img src={"/images/getAll.png"} className="w-50 mt2"></img>
            <h3 className="f6 tc">{buttonLabel}</h3>
        </div>
       
    )
}
export default ShowAll