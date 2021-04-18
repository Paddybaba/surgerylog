import tachyons from 'tachyons'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import {useRouter} from 'next/router'
import NewPatient from './NewPatient'
import SearchField from './SearchField'
import axios from 'axios'
import { useState,useEffect } from 'react'
import PatientDetails from './PatientDetails'
import PatientModal from './PatientModal'
import Recent from './Recent'
import ListofPatients from './ListofPatients'
import {Modal, Button} from 'react-bootstrap'
// import { Button } from 'react-bootstrap'
import ShowAll from './ShowAll'
import PatientImages from './PatientImages'

    function Dashboard({user, gotoLogin, gotoAddNew, gotoEditPatient, getSelectedPatient}){
    var imagePath = user.imagePath;
    const [modalShow, setModalShow] = useState(false);
    const [imagesShow, setImagesShow] = useState(false);
    const [xrayPaths, setXrayPaths] = useState([{xraypath:""}]);
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
        getRecent();
        console.log(user)
    },[])
////////// GET RECENT PATIENTS >>>>>>>>>>>>
    async function getRecent(){
        const response = await fetch ('https://paddybaba.ddns.net/recent',{
            method:'POST',
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(user)
            })
        const data = await response.json();
        updateData(data);
    }
/////////// GET SEARCH PATIENTS >>>>>>>>>>>>>>
    async function getPatientList(keyword){
        const response = await axios.post("https://paddybaba.ddns.net/search", {user: user, keyword :keyword})
    
        console.log(response.data)
        updateData(response.data);
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
        getSelectedPatient(data[0]);
        setModalShow(true);
    }

    function showAllPaients(){
        setShowRecent(!showRecent);
    }
    
    async function deletePatient(patient_id){
        if(confirm("Are you sure to delete this record ?")){
            var data = {
                patient_id : patient_id
            }
            const response= await fetch("https://paddybaba.ddns.net/deletePatient",
                            {method: "POST",
                            headers:{"Content-type":"application/json"},
                            body:JSON.stringify(data)
                            })
                    setModalShow(false); 
                    getRecent();   
        }
        else{//do nothing}
                    
        }
    }

    const showImages = async  (patient_id) =>{
        const response = await axios.post("https://paddybaba.ddns.net/showImages",{patient_id})
        const imageArray = await response.data;
        setXrayPaths(imageArray);
        setModalShow(false);
        setImagesShow(true);
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
               
                <ShowAll   
                            showAllPatients={showAllPaients}
                            showRecent={showRecent}></ShowAll>
                <SearchField  getRecent = {getRecent} getPatientList={getPatientList} ></SearchField>
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
                     gotoEditPatient={gotoEditPatient}
                     deletePatient = {deletePatient}
                     showImages = {showImages}/>
            
                    <PatientImages
                        show = {imagesShow} 
                        onHide={()=>setImagesShow(false)}
                        patient = {patient}
                        user = {user}
                        xrayPaths = {xrayPaths}/>
        </div>
        </div>
        
    )
}

export default Dashboard

