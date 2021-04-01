import styles from '../Components/Components.module.css'
import {ReactFitty} from'react-fitty'


const PatientCard = ({patient}) =>{
    const xray = `https://paddybaba.ddns.net/xray/${patient.xraypath}`;
    return(
        <div className={styles.pCard}>
            <img className={styles.positionAbs} src="/images/demoPatient.png" alt="Patient Pic"></img>
            <img className={styles.pImage} src={xray} alt="Demo Pic"></img>
            <h4 className={styles.fTitle}>{patient.patientname}</h4>
            <h5 className={styles.fDate}>Admit : {patient.admissiondate}</h5>
            <h5 className={styles.fDate}>Disch : {patient.dischargedate}</h5>
        </div>

        //// BOOTSTRAP CARD
        // <div>
        //         <h1>Patient</h1>
        //       <div className="card" style="width: 18rem;">
        //     <img src={xray} className="card-img-top" alt="X Ray"></img>
        //     <div className="card-body">
        //     <h5 className="card-title">{patient.patientname}</h5>
        //     <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        //     <a href="#" className="btn btn-primary">Go somewhere</a>
        //      </div>
        // </div>  
        // </div>
        
    )
}
export default PatientCard