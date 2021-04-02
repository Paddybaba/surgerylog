import styles from '../Components/Components.module.css'
import {ReactFitty} from'react-fitty'
import {Card, Button, Image} from 'react-bootstrap'


const PatientCard = ({patient, getPatientDetails}) =>{
    const xray = `https://paddybaba.ddns.net/xray/${patient.xraypath}`;
    return(
        <div className={styles.pCard} onClick={getPatientDetails} id={patient.patient_id}>
            <img className={styles.positionAbs} src="/images/demoPatient.png" alt="Patient Pic"></img>
            <Image className={styles.pImage} src={xray} alt="Demo Pic"></Image>
            <h4 className={styles.fTitle}>{patient.patientname}</h4>
            <h5 className={styles.fDate}>Admit : {patient.admissiondate}</h5>
            <h5 className={styles.fDate}>Disch : {patient.dischargedate}</h5>
        </div>

        // <Card style={{ width: '18rem' }}>
        //  <Card.Body>
        //     <Card.Title>{patient.patientname}</Card.Title>
        //     <Card.Img variant="top" src={xray} />
            
        //          <Card.Text>
        //              Admi : {patient.admissiondate}
        //          </Card.Text>
        //          <Card.Text>
        //              Disch : {patient.dischargedate}
        //          </Card.Text>
        //      </Card.Body>
        //     </Card>
        
    )
}
export default PatientCard