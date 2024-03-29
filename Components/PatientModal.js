import {Modal, Button} from 'react-bootstrap'
import styles from '../Components/Components.module.css'  


  /////// MODAL >>>>>

  function PatientModal(props) {
    // console.log(props.patient)
    const {gotoEditPatient, deletePatient, showImages,  ...rest} = props
    // console.log(props.patient.patient_id)
    return (
      <Modal
        {...rest}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <div className={styles.modal}>
      <Modal.Body >
          <h2 className="tc">{props.patient.patientname}</h2>
          <p>Age : {props.patient.age}       Gender: {props.patient.gender}</p>
          <p>Address : {props.patient.address}</p>
          <p>Admission : {props.patient.admissiondate}  Discharge: {props.patient.dischargedate}</p>
          <p>Phone : {props.patient.phone}</p>
          <p>Diagnosis: {props.patient.diagnosis}</p>
          <p>History :{props.patient.clinicalhistory}</p>
          <p>Findings :{props.patient.clinicalfindings}</p>
          <p>Surgery :{props.patient.surgerydone}</p>
          <p>Anaesthesia : {props.patient.anaesthesia}</p>
          <p>Intraop Findings :{props.patient.intraop}</p>


          {/* <img  className={styles.modalImage} src="/images/quote.jpg"></img> */}
        </Modal.Body>
        <Modal.Footer >
          <Button className={styles.left} variant="danger" onClick={()=>{props.deletePatient(props.patient.patient_id)}}>Delete</Button>
          <Button onClick={props.gotoEditPatient}>Edit</Button>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={()=>{showImages(props.patient.patient_id)}}>Xrays</Button>
          
        </Modal.Footer>
      </div>
       
      </Modal>
    );
  }

  export default PatientModal;