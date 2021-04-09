import styles from '../Components/Components.module.css'
import PatientCard from './PatientCard'
function Recent({data,getPatientDetails}){
    return(
        <div className="mt-3">
                <h5>Recently Updated ...</h5>
                <div className={styles.scrollX}>
                {
                        data.map((patient, index)=>{
                           return <PatientCard key={index} patient={patient} getPatientDetails={getPatientDetails}/>                        })
                    }
                </div>             
                 </div>
    )
}
export default Recent;