import Head from 'next/head'
import styles from '../Components/Components.module.css'
import { useState } from 'react'

const initialValues = {
    patientname : "",
    age : "",
    gender : "Male",
    address: "",
    city:"",
    phone:"",
    hospital:"Gupta Hospital, Dhamtari",
    diagnosis : "",
    aoclass : "",
    admissiondate :"",
    dischargedate : "",
    clinicalhistory :"",
    clinicalfindings:"",
    surgerydone :"",
    anaesthesia : "Spinal",
    intraop : "",
    duration : "",
    preopxray:""
}

const AddPatientForm = ({gotoDashboard}) => {
 const [values, setValues]= useState(initialValues)  
 const handleInputChange=(event)=>{
    const {name,value} = event.target;
    setValues({
        ...values,
        [name]:value,
    });
 }
 const onSubmitClick =(event)=>{
    event.preventDefault(); 
    gotoDashboard(); 
    console.log(values)
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
                        <label className="tl" htmlFor="patientname">Name </label>
                        <input id="username" value={values.name} onChange={handleInputChange} type="text" name="patientname" className="ma2 ba b--silver br2"
                           ></input>
                    </div>
                    <div className="">
                        <label className="tl" htmlFor="age">Age </label>
                        <input id="age" value={values.age} onChange={handleInputChange} type="text" name="age" className="ma2 ba b--silver br2 w-10"
                            ></input>

                        <label className="ph3" htmlFor="age">Gender </label>
                        <select value={values.gender} onChange={handleInputChange}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div>
                        
                    </div>
                    <div className="">
                        <label className="" htmlFor="address">Address</label>
                        <input id="address" value={values.address} onChange={handleInputChange} type="text" name="address" className="mw9 ma2 ba b--silver br2"
                            ></input>
                    </div>
                    <div className="">
                        <label className="" htmlFor="city">City</label>
                        <input id="city" value={values.address} onChange={handleInputChange} type="text" name="city" className="w-20 ma2 ba b--silver br2"
                        ></input>

                        <label className="" htmlFor="Phone">Phone</label>
                        <input id="Phone" value={values.address} onChange={handleInputChange} type="number" name="Phone" className="w-30 ma2 ba b--silver br2"
                        ></input>
                    </div>
                    <div>
                    <label className="" htmlFor="hospital">Hospital</label>
                        <input id="hospital" value={values.address} onChange={handleInputChange} type="text" name="hospital" className="w-20 ma2 ba b--silver br2"
                        ></input>
                    </div>
                    <div>
                    <label className="" htmlFor="diagnosis">Diagnosis</label>
                        <input id="diagnosis" value={values.address} onChange={handleInputChange} type="text" name="diagnosis" className="w-20 ma2 ba b--silver br2"
                        ></input>
                    </div>
                    <div>
                    <label className="" htmlFor="aoclass">AO Classification</label>
                        <input id="aoclass" value={values.address} onChange={handleInputChange} type="text" name="aoclass" className="w-20 ma2 ba b--silver br2"
                        ></input>
                    </div>
                    <div>
                    <label className="" htmlFor="admissiondate">Date of Admission</label>
                        <input id="admissiondate" value={values.address} onChange={handleInputChange} type="date" name="admissiondate" className="w-20 ma2 ba b--silver br2"
                        ></input>
                    </div>
                    <div>
                    <label className="" htmlFor="dischargedate">Date of Discharge</label>
                        <input id="dischargedate" value={values.address} onChange={handleInputChange} type="date" name="dischargedate" className="w-20 ma2 ba b--silver br2"
                        ></input>
                    </div>
                    <div>
                    <label className="" htmlFor="clinicalhistory">Clinical History</label>
                        <input id="clinicalhistory" value={values.address} onChange={handleInputChange} type="text" name="clinicalhistory" className="w-20 ma2 ba b--silver br2"
                        ></input>
                    </div>    
                    <div>
                    <label className="" htmlFor="clinicalfindings">Clinical Findings</label>
                        <input id="clinicalfindings" value={values.address} onChange={handleInputChange} type="text" name="clinicalfindings" className="w-20 ma2 ba b--silver br2"
                        ></input>
                    </div>
                    <label className="" htmlFor="surgerydone">Surgery</label>
                        <input id="surgerydone" value={values.address} onChange={handleInputChange} type="text" name="surgerydone" className="w-20 ma2 ba b--silver br2"
                        ></input>
                    <div>
                    <div>
                    <label className="" htmlFor="anaesthesia">Anaesthesia</label>
                        <input id="anaesthesia" value={values.address} onChange={handleInputChange} type="text" name="anaesthesia" className="w-20 ma2 ba b--silver br2"
                        ></input>
                    </div>
                    <div>
                    <label className="" htmlFor="intraop">Intraop Findings</label>
                        <input id="intraop" value={values.address} onChange={handleInputChange} type="text" name="intraop" className="w-20 ma2 ba b--silver br2"
                        ></input>
                    </div>
                    <div>
                    <label className="" htmlFor="preop">Preop Images</label>
                        <input id="preop" value={values.address} onChange={handleInputChange} type="file" name="preop" className="w-50 ma2 ba b--silver br2"
                        ></input>
                    </div>
                    <div className="flex justify-around">
                        <button className="color-inherit bg-black-90 dim pointer mt1 mb2 ba b--silver br2" type="submit" onClick={(e)=>onSubmitClick(e)}>Submit</button>
                        <button className="color-inherit bg-black-90 dim pointer mt1 mb2 ba b--silver br2" type="button" onClick={()=>{gotoDashboard()}}>Cancel</button>
                    </div>
            
                    </div>

                </form>
            </main>    
          </div>
          )

}
export default AddPatientForm;
