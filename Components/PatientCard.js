import styles from '../Components/Components.module.css'
import {Card, Button, Image} from 'react-bootstrap'


const PatientCard = ({patient, getPatientDetails}) =>{
    var xray;
    if(patient.xraypath){
        xray = `https://paddybaba.ddns.net/xray/${patient.xraypath}`;
    }else {
        xray = "/images/noxray.png" 
    }
    return(
        <div className={styles.pCard} onClick={getPatientDetails} id={patient.patient_id}>
            <img className={styles.positionAbs} src="/images/demoPatient.png" alt="Patient Pic"></img>
            <Image className={styles.pImage} src={xray} alt="Demo Pic"></Image>
            <h4 className={styles.fTitle}>{patient.patientname}</h4>
            <h5 className={styles.fDate}>Admit : {patient.admissiondate}</h5>
            <h5 className={styles.fDate}>Disch : {patient.dischargedate}</h5>
        </div>        
    )
}
export default PatientCard