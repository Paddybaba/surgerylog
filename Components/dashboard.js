import tachyons from 'tachyons'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import {useRouter} from 'next/router'
import NewPatient from './NewPatient'
import SearchField from './SearchField'

import { useState,useEffect } from 'react'
import PatientDetails from './PatientDetails'
import PatientModal from './PatientModal'
import Recent from './Recent'
import ListofPatients from './ListofPatients'
// import { Button } from 'react-bootstrap'
import ShowAll from './ShowAll'


    function Dashboard({user, gotoLogin, gotoAddNew}){
    var imagePath = user.imagePath;
    const [modalShow, setModalShow] = useState(false);
    const [data, updateData]= useState([])
    const [showRecent, setShowRecent]= useState(true)
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
        // buttonToggle = document.getElementById("toggleButton");
        // buttonToggle.value = "Show All";
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
        
        updatePatient(data[0]);
        setModalShow(true);
    }

    function showAllPaients(){
        setShowRecent(!showRecent);
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
               
                <ShowAll    showAllPatients={showAllPaients}
                            showRecent={showRecent}></ShowAll>
                <SearchField></SearchField>
            </div>
            {/* ///////// Dsiplaying Recent or All Patients Depending upon showRecent true:false */}

                { showRecent? 
                    <Recent 
                     data = {data}
                     getPatientDetails = {getPatientDetails}   
                    /> 
                    : 
                    <ListofPatients
                    data = {data}
                    getPatientDetails = {getPatientDetails} /> }  
                
                
                 <PatientModal
                     show={modalShow}
                     onHide={() => setModalShow(false)}
                     patient={patient}
                                                        />
            
            
        </div>
        </div>
        
    )
}

export default Dashboard

