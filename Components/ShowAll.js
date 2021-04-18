import styles from '../Components/Components.module.css'
var buttonLabel;

const ShowAll = ({getRecent, showAllPatients, showRecent}) =>{
    if(showRecent){
        buttonLabel = "List View"
    }else{
        buttonLabel = "Card View"
    }
    return (
        
        <div className={styles.card} onClick={()=>{showAllPatients();}}>
            <img src={"/images/getAll.png"} className="w-50 mt2"></img>
            <h3 className="f6 tc">{buttonLabel}</h3>
        </div>
       
    )
}
export default ShowAll