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
    const [patient, updatePatient]= useState();
    var image = `https://paddybaba.ddns.net/images/${imagePath}`
    var image2 = `https://paddybaba.ddns.net/xray/hip.jpg`

    
    // const recentData = [    {
    //     name : "Anup",
    //     doa : "23/3/2021",
    //     dod : "24/3/2021",
    //     xraypath : "https://paddybaba.ddns.net/xray/hip.jpg"
    //   },
    //   {
    //     name : "Mayank",
    //     doa : "28/3/2021",
    //     dod : "30/3/2021",
    //     xraypath : 'https://paddybaba.ddns.net/images/12345.jpg'
    //   }]

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
        
        console.log(data)
        updatePatient(data);
        setModalShow(true);
    }
/////////////// MODAL >>>>>>>>>>>>>>

    function MyVerticallyCenteredModal(patient) {
        return (
          <Modal
            {...patient}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <h4>Coming Soon !!!</h4>
              <img  className={styles.modalImage} src="/images/quote.jpg"></img>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={patient.onHide}>Close</Button>
            </Modal.Footer>
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

