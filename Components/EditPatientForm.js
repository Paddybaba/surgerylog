import Head from 'next/head'
import styles from '../Components/Components.module.css'
import { useState } from 'react'

var dataToBeUploaded = ""
  
function getToday(){
    var date = new Date;
    var yyyy = date.getFullYear();
    var mm = `${date.getMonth() + 1}`.padStart(2, '0');
    var dd = `${date.getDate()}`.padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`
}

////////  MAIN FUNCTION...........
const EditPatientForm = ({gotoDashboard, user, selectedPatient}) => {
    const user_email = user.email;
    // console.log(selectedPatient);
    // const initialValues = {
    //     patientname : selectedPatient.patientname,
    //     age : 60,
    //     gender : selectedPatient.gender,
    //     address: selectedPatient.address,
    //     city:selectedPatient.city,
    //     phone:selectedPatient.phone,
    //     hospital:selectedPatient.hospital,
    //     diagnosis : selectedPatient.diagnosis,
    //     aoclass : selectedPatient.aoclass,
    //     admissiondate : selectedPatient.admissiondate,
    //     dischargedate : selectedPatient.dischargedate,
    //     clinicalhistory : selectedPatient.clinicalhistory,
    //     clinicalfindings: selectedPatient.clinicalfindings,
    //     surgerydone : selectedPatient.surgerydone,
    //     surgerydate: selectedPatient.surgerydate,
    //     anaesthesia : selectedPatient.anaesthesia,
    //     intraop : selectedPatient.intraop,
    //     duration : selectedPatient.duration
    // }

    const [values, setValues]= useState(selectedPatient)  
    const [imageFile, setImageFile]=useState("")



 const handleInputChange=(event)=>{
    const {name,value} = event.target;
    setValues({
        ...values,
        [name]:value,
    });
 }
 async function onSubmitClick (event){
    event.preventDefault(); 
    let fd = new FormData();
    console.log(values)
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
    alert(`Patient ${dataToBeUploaded.patient} updated successfully in the database !!! \n Click OK to go back`)
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
                <title>Edit Patient</title>
                <link rel="icon" href="/favicon.ico" />
             </Head>
            </div>
        
            <main className="">
                <h1 className="f3 tc">
                    Edit Details of Patient 
                </h1>

                <form className=" bg-transparent pa3 ba b--silver br3">
                    <div className="">
                        <label className="tl" htmlFor="patientname">Name* </label>
                        <input id="username" value={values.patientname} onChange={handleInputChange} type="text" name="patientname" className="w-90 ma2 ba b--silver br2"
                           ></input>
                    </div>
                    <div className="">
                        <label className="tl" htmlFor="age">Age* </label>
                        <input id="age" value={values.age} onChange={handleInputChange} type="number" name="age" className="ma2 ba b--silver br2 w-20"
                            ></input>

                        <label className="ph2" htmlFor="age">Gender </label>
                        <select name="gender" className="w-20" defaultValue={values.gender} onChange={handleInputChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
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
                    <div>
                    <label className="" htmlFor="surgerydate">Date of Surgery</label>
                        <input id="surgerydate" value={values.surgerydate} onChange={handleInputChange} type="date" name="surgerydate" className="w-30 ma2 ba b--silver br2"
                        ></input>
                    </div>
                    <label className="" htmlFor="surgerydone">Surgery</label>
                        <input id="surgerydone" value={values.surgerydone} onChange={handleInputChange} type="text" name="surgerydone" className="w-60 ma2 ba b--silver br2"
                        ></input>
                    <div>
                    <div>
                    <label className="ph2" htmlFor="age">Anaesthesia </label>
                        <select name="anaesthesia" className="w-20" defaultValue={values.anaesthesia} onChange={handleInputChange}>
                            <option value="Spinal">Spinal Anaesthesia</option>
                            <option value="General">General Anaesthesia</option>
                            <option value="Local">Local Anaesthesia</option>
                            <option value="Block">Regional Block</option>
                        </select>
                    </div>
                    <div>
                    <label className="" htmlFor="intraop">Intraop Findings</label>
                        <input id="intraop" value={values.intraop} onChange={handleInputChange} type="text" name="intraop" className="w-80 ma2 ba b--silver br2"
                        ></input>
                    </div>
                    <div>
                    <label className="" htmlFor="preopxray">Preop Images <span className="f8"> (Max 3 file)</span></label>
                        <input  id="preopxray"  
                                accept="image/*" 
                                onChange={(event)=>{setImageFile(event.target.files)}} 
                                type="file" 
                                name="preopxray" 
                                multiple
                                className="w-90 ma2 ba b--silver br2"
                        ></input>
                    </div>
        
                    <div className="flex justify-around">
                        <button className="color-inherit bg-black-90 dim pointer mt1 mb2 ba b--silver br2" type="submit" onClick={(e)=>onSubmitClick(e)}>Update</button>
                        <button className="color-inherit bg-black-90 dim pointer mt1 mb2 ba b--silver br2" type="reset" onClick={(e)=>{onResetClick(e)}}>Reset</button>
                        <button className="color-inherit bg-black-90 dim pointer mt1 mb2 ba b--silver br2" type="button" onClick={()=>{gotoDashboard()}}>Cancel</button>
                    </div>
            
                    </div>
                    </form>
                    
            </main>    
          </div>
          )

}
export default EditPatientForm;
