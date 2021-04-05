import tachyons from 'tachyons'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import {useRouter} from 'next/router'
import NewPatient from './NewPatient'
import SearchField from './SearchField'
import PatientCard from './PatientCard'
import { useState,useEffect } from 'react'
import PatientDetails from './PatientDetails'
import {Modal, Button} from 'react-bootstrap'



    function Dashboard({user, gotoLogin, gotoAddNew}){
    var imagePath = user.imagePath;
    const [modalShow, setModalShow] = useState(false);
    const [data, updateData]= useState([])
    const [patient, updatePatient]= useState({
        patientname : "",
        age : 60,
        gender : "Male",
        address: "",
        city:"",
        phone:1112223334,
        hospital:"Gupta Hospital, Dhamtari",
        diagnosis : "",
        aoclass : "",
        admissiondate :"",
        dischargedate : "",
        clinicalhistory :"",
        clinicalfindings:"",
        surgerydone :"",
        anaesthesia : "Spinal",
        intraop : "None of special mention",
        duration : ""});
    var image = `https://paddybaba.ddns.net/images/${imagePath}`
    var image2 = `https://paddybaba.ddns.net/xray/hip.jpg`

    useEffect(()=>{
        localStorage.setItem("currentUser",JSON.stringify(user))
        getRecent();
        console.log(user)
    },[])

    async function getRecent(){
        const response = await fetch ('https://paddybaba.ddns.net/recent',{
            method:'POST',
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(user)
            })
        const data = await response.json();
        updateData(data);
    }

    async function getPatientDetails(){
        
        const patient_id = event.target.parentNode.id;
        const patient = {
            patient : patient_id,
            user : user.email
        }

        const response = await fetch('https://paddybaba.ddns.net/patient',{
            method:'POST',
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(patient)
        })

        const data = await response.json();
        
        // console.log(data[0])
        updatePatient(data[0]);
        setModalShow(true);
    }
/////////////// MODAL >>>>>>>>>>>>>>

    function MyVerticallyCenteredModal(props) {
        console.log(props.patient)
        return (
          <Modal
            {...props}
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
              <Button onClick={props.onHide}>Close</Button>
              <Button onClick={props.onHide}>Xrays Coming Soon</Button>
            </Modal.Footer>
          </div>
           
          </Modal>
        );
      }
    
    return(
        <div>
            <Head>
                <title>Dashboard</title>
                <meta name="viewport" content="width=device-width maximum-scale=1.5" ></meta>
               </Head>
            <div className={styles.container_dash}>
                <div className={styles.top}>
                    <h3 className="ma0">Surgery Log Software</h3>
                     <div className="flex justify-between">
                         
                             <h4 className="mt0 pa2 f5 ">{user.username}</h4>  
                            <img className={styles.profilepic} src={image}></img>                      
                      
                        <h4 onClick={()=>{gotoLogin()}} className="pointer grow f5 pa2">Logout</h4>
                        
                     </div>                
                </div>
            <div className="flex justify-between ma3 mt5">
                
                <NewPatient gotoAddNew={gotoAddNew}></NewPatient>
                <SearchField></SearchField>
            </div>
                <div className="mt-3">
                <h5>Recently Updated ...</h5>
                <div className={styles.scrollX}>
                {
                        data.map((patient, index)=>{
                           return <PatientCard key={index} patient={patient} getPatientDetails={getPatientDetails}/>                        })
                    }
                </div>             
                 </div>
                 <MyVerticallyCenteredModal
                     show={modalShow}
                     onHide={() => setModalShow(false)}
                     patient={patient}
                                                        />
            
            
        </div>
        </div>
        
    )
}

export default Dashboard

