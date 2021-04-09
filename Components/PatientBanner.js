import styles from '../Components/Components.module.css'
const PatientBanner = ({patient, getPatientDetails}) =>{
    var xray;
    if(patient.xraypath){
        xray = `https://paddybaba.ddns.net/xray/${patient.xraypath}`;
    }else {
        xray = "/images/noxray.png" 
    }
    
    return(
        <div className={styles.banner} onClick={getPatientDetails} id={patient.patient_id}>
            <img className={styles.bannerImage} src={xray} alt="X-Ray"></img>
            <div className="ml2 w-90" id={patient.patient_id}>
                    <div className="f6">{patient.patientname}</div>
                    <div className="f7">Diagnosis</div>
            </div>
            
            {/* <div className={styles.empty}> </div> */}
        </div>
    )
}
export default PatientBanner;