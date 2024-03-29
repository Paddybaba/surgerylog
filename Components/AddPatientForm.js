import Head from 'next/head'
import styles from '../Components/Components.module.css'
import { useState } from 'react'
import Modal from 'react-modal'
import Resizer from "react-image-file-resizer";


Modal.setAppElement('main')
var dataToBeUploaded = ""
  
function getToday(){
    var date = new Date;
    var yyyy = date.getFullYear();
    var mm = `${date.getMonth() + 1}`.padStart(2, '0');
    var dd = `${date.getDate()}`.padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`
}
///////// RESIZE IMAGE FILE BEFORE UPLOADING
const resizeFile = (file) =>
new Promise((resolve) => {
  Resizer.imageFileResizer(
    file,
    1280,
    960,
    "JPEG",
    100,
    0,
    (uri) => {
      resolve(uri);
    },
    "file"
  );
});



////////  MAIN ...........
const AddPatientForm = ({gotoDashboard, user}) => {    
    
    const user_email = user.email;
    
    const initialValues = {
        user : user_email,
        patientname : "",
        age : 60,
        gender : "",
        address: "",
        city:"",
        phone:1112223334,
        hospital:"Gupta Hospital, Dhamtari",
        diagnosis : "",
        aoclass : "",
        admissiondate :getToday(),
        dischargedate : getToday(),
        clinicalhistory :"",
        clinicalfindings:"",
        surgerydone :"",
        surgerydate:getToday(),
        anaesthesia : "",
        intraop : "",
        duration : ""
    }   
 const [values, setValues]= useState(initialValues)  
 const [imageFile, setImageFile]=useState("")
//  const [modalIsOpen, setModalIsOpen]= useState(false)


 const handleInputChange=(event)=>{
    const {name,value} = event.target;
    setValues({
        ...values,
        [name]:value,
    });
 }
////////////  UPDATING IMAGES STATE WITH RESIZED IMAGES >>>>>>>>>>>>>
 const onChange = async (event) => {
     let image = [];
    try {
      const file = event.target.files;
      const fileArray = Array.from(file);
      for (let i = 0; i<fileArray.length; i++){
         image.push(await resizeFile(fileArray[i])); 
      } 
      setImageFile(image);
      }
     catch (err) {
      console.log(err);
    }
  };

 async function onSubmitClick (event){
    event.preventDefault(); 
    let fd = new FormData();
    console.log(imageFile)

    fd.append('patientData', JSON.stringify(values))
    for (const file of imageFile){
        fd.append("preop", file)
    }

    const response = await fetch('https://paddybaba.ddns.net//uploadForm', {
        method:"POST",
        origin: "CORS",
        body : fd
    })
    dataToBeUploaded = await response.json();
    console.log(dataToBeUploaded);
    alert(`Patient ${dataToBeUploaded.patient} saved successfully in the database !!! \n Click OK to go back`)
    gotoDashboard(); 

}
const onResetClick = (event) =>{
    event.preventDefault();
    setValues(initialValues);
}
 
    return (
        <div className={styles.container_addNew}>
            <div>
             <Head>
                <title>Add New Patient</title>
                <link rel="icon" href="/favicon.ico" />
             </Head>
            </div>
        
            <main className="">
                <h1 className="f3 tc">
                    Add Details of Patient 
                </h1>

                <form className=" bg-transparent pa3 ba b--silver br3">
                    <div className="">
                        <label className="tl" htmlFor="patientname">Name* </label>
                        <input id="username" value={values.name} onChange={handleInputChange} type="text" name="patientname" className="w-90 ma2 ba b--silver br2"
                           ></input>
                    </div>
                    <div className="">
                        <label className="tl" htmlFor="age">Age* </label>
                        <input id="age" value={values.age} onChange={handleInputChange} type="number" name="age" className="ma2 ba b--silver br2 w-20"
                            ></input>

                        <label className="ph2" htmlFor="age">Gender </label>
                        <select name="gender" className="w-20" defaultValue={values.gender} onChange={handleInputChange}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="">
                        <label className="tl" htmlFor="ADDRESS">Address </label>
                        <input id="address" value={values.address} onChange={handleInputChange} type="text" name="address" className="w-80 ma2 ba b--silver br2"
                           ></input>
                    </div>
                    <div className="">
                        <label className="" htmlFor="city">City</label>
                        <input id="city" value={values.city} onChange={handleInputChange} type="text" name="city" className="w-20 ma2 ba b--silver br2"
                        ></input>

                        <label className="" htmlFor="phone">Phone*</label>
                        <input id="phone" value={values.phone} onChange={handleInputChange} type="number" name="phone" className="w-30 ma2 ba b--silver br2"
                        ></input>
                    </div>
                    <div>
                    <label className="" htmlFor="hospital">Hospital</label>
                        <input id="hospital" value={values.hospital} onChange={handleInputChange} type="text" name="hospital" className="w-60 ma2 ba b--silver br2"
                        ></input>
                    </div>
                    <div>
                    <label className="" htmlFor="diagnosis">Diagnosis</label>
                        <input id="diagnosis" value={values.diagnosis} onChange={handleInputChange} type="text" name="diagnosis" className="w-60 ma2 ba b--silver br2"
                        ></input>
                    </div>
                    <div>
                    <label className="" htmlFor="aoclass">AO Classification</label>
                        <input id="aoclass" value={values.aoclass} onChange={handleInputChange} type="text" name="aoclass" className="w-20 ma2 ba b--silver br2"
                        ></input>
                    </div>
                    <div>
                    <label className="" htmlFor="admissiondate">Date of Admission</label>
                        <input id="admissiondate" value={values.admissiondate} onChange={handleInputChange} type="date" name="admissiondate" className="w-30 ma2 ba b--silver br2"
                        ></input>
                    </div>
                    <div>
                    <label className="" htmlFor="dischargedate">Date of Discharge</label>
                        <input id="dischargedate" value={values.dischargedate} onChange={handleInputChange} type="date" name="dischargedate" className="w-30 ma2 ba b--silver br2"
                        ></input>
                    </div>
                    <div>
                    <label className="" htmlFor="clinicalhistory">Clinical History</label>
                        <input id="clinicalhistory" value={values.clinicalhistory} onChange={handleInputChange} type="text" name="clinicalhistory" className="w-90 ma2 f5 ba b--silver br2 "
                        ></input>
                    </div>    
                    <div>
                    <label className="" htmlFor="clinicalfindings">Clinical Findings</label>
                        <input id="clinicalfindings" value={values.clinicalfindings} onChange={handleInputChange} type="text" name="clinicalfindings" className="w-90 ma2 f5 ba b--silver br2"
                        ></input>
                    </div>
                    <label className="" htmlFor="surgerydone">Surgery</label>
                        <input id="surgerydone" value={values.surgerydone} onChange={handleInputChange} type="text" name="surgerydone" className="w-60 ma2 ba b--silver br2"
                        ></input>
                    <div>
                    <div>
                    <label className="" htmlFor="surgerydate">Date of Surgery</label>
                        <input id="surgerydate" value={values.surgerydate} onChange={handleInputChange} type="date" name="surgerydate" className="w-30 ma2 ba b--silver br2"
                        ></input>
                    </div>
                    <div>
                    <label className="ph2" htmlFor="age">Anaesthesia </label>
                        <select name="anaesthesia" className="w-20" defaultValue={values.anaesthesia} onChange={handleInputChange}>
                            <option value="spinal">Spinal Anaesthesia</option>
                            <option value="general">General Anaesthesia</option>
                            <option value="local">Local Anaesthesia</option>
                            <option value="block">Regional Block</option>
                        </select>
                    </div>
                    <div>
                    <label className="" htmlFor="intraop">Intraop Findings</label>
                        <input id="intraop" value={values.intraop} onChange={handleInputChange} type="text" name="intraop" className="w-80 ma2 ba b--silver br2"
                        ></input>
                    </div>
                    <div>
                    <label className="" htmlFor="xray">Images <span className="f8"> (Max 3 file)</span></label>
                        <input  id="xray"  
                                accept="image/*" 
                                onChange={(event)=>{onChange(event)}}                                   
                                type="file" 
                                name="xray" 
                                multiple
                                className="w-90 ma2 ba b--silver br2"
                        ></input>
                    </div>
        
                    <div className="flex justify-around">
                        <button className="color-inherit bg-black-90 dim pointer mt1 mb2 ba b--silver br2" type="submit" onClick={(e)=>onSubmitClick(e)}>Submit</button>
                        <button className="color-inherit bg-black-90 dim pointer mt1 mb2 ba b--silver br2" type="reset" onClick={(e)=>{onResetClick(e)}}>Reset</button>
                        <button className="color-inherit bg-black-90 dim pointer mt1 mb2 ba b--silver br2" type="button" onClick={()=>{gotoDashboard()}}>Cancel</button>
                    </div>
            
                    </div>
                    </form>
                    
                    {/* <Modal isOpen={modalIsOpen} className={styles.modal} autoFocus={true} >
                        <div>
                            <h3 className="f4">New patient will be added with following details</h3>
                            <div className="f6">
                                <p>Name : {dataToBeUploaded.patientname} </p>
                                <p>Age : {dataToBeUploaded.age}</p>
                                <p>Gender : {dataToBeUploaded.gender}</p>
                                <p>Address : {dataToBeUploaded.address}</p>
                                <p>City : {dataToBeUploaded.city}</p>
                                <p>Phone : {dataToBeUploaded.phone}</p>
                                <p>Hospital : {dataToBeUploaded.hospital}</p>
                                <p>Diagnosis : {dataToBeUploaded.diagnosis}</p>
                                <p>AO Classification : {dataToBeUploaded.aoclass}</p>
                                <p>Date of Admission : {dataToBeUploaded.admissiondate}</p>
                                <p>Date of Discharge : {dataToBeUploaded.dischargedate}</p>
                                <p>Clinical History : {dataToBeUploaded.clinicalhistory}</p>
                                <p>Clinical Findings : {dataToBeUploaded.clinicalfindings}</p>
                                <p>Surgery Done : {dataToBeUploaded.surgerydone}</p>
                                <p>Intra-Op  : {dataToBeUploaded.intraop}</p>
                                <img src={imageFile} alt="Preop"></img>
                            </div>
                            <button onClick={()=>{setModalIsOpen(false)}}>Confirm</button>
                        </div>
                    </Modal>              */}
            </main>    
          </div>
          )

}
export default AddPatientForm;
