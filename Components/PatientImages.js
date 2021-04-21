// import {div, Row,Col} from 'react-bootstrap'
import {Modal, Button, ProgressBar} from 'react-bootstrap'
import styles from '../Components/Components.module.css'  
import Resizer from "react-image-file-resizer";
import axios from 'axios';
import { useState } from 'react';


function imageClick(element){
  const enlargedImage = document.createElement("img")
  enlargedImage.src = element.src;
  document.getElementById("enlargedXray").appendChild(enlargedImage);
  document.getElementById("enlargedXray").hidden = false;

}

function hideDiv(){
  document.getElementById("enlargedXray").hidden = true
  document.getElementById("enlargedXray").removeChild(document.getElementById("enlargedXray").lastChild);
}
//////// MAIN FUNCTION

  function PatientImages(props) {
    const {xrayPaths, patient, user, ...rest} = props
    const [uploadProgress, setUploadProgress] = useState(0);
    console.log(patient.patient_id)

    ////////// ADD MORE IMAGES >>>>>>>>
   /// 1. ///////// RESIZE IMAGE FILE BEFORE UPLOADING
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
    //// 2. ////////////  UPDATING IMAGES STATE WITH RESIZED IMAGES >>>>>>>>>>>>>
            const onChange = async (event) => {
                 ////// UPLOAD PROGRESS CONFIG 
              var config = {
                onUploadProgress: function(progressEvent) {
                  var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                  setUploadProgress(percentCompleted);
                }
              };              
              let image = [];

            try {
              const file = event.target.files;
              const fileArray = Array.from(file);
              for (let i = 0; i<fileArray.length; i++){
                  image.push(await resizeFile(fileArray[i])); 
              }      
            ///////  PUSH TO THE SERVER USING FORM DATA
              let fd = new FormData();
              fd.append('patient_id',patient.patient_id)
              fd.append('patientname', patient.patientname)
              fd.append('user', user.email)
              for (const file of image){
                fd.append("newImage", file)
              }
              const response = axios.post("https://paddybaba.ddns.net/newImages", fd, config)
              if(response){
                //// REFERESH IMAGES
                showImages(patient.patient_id); /////NOT WORkiNG
              }
              }catch (err) {
              console.log(err);
            }
            };

      var xray = `https://paddybaba.ddns.net/xray/${xrayPaths[0].xraypath}`;
            
    return (
      <Modal
        {...rest}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <div className={styles.modal}>
      <Modal.Body >
        <div className={styles.xrayEnlarged} id="enlargedXray" onClick={()=>{hideDiv()}}> </div>
        <div className={styles.xrayContainer} id = "xrayContainer">
               {
                 xrayPaths.map((element, index)=>{
                    return <img onClick={(event)=>{imageClick(event.target)}} className={styles.xrayFilms} src={`https://paddybaba.ddns.net/xray/${element.xraypath}`} key={index}/>
                 })
              
               }
        </div>
        <div>
          {uploadProgress >0 && uploadProgress<100 && <ProgressBar now={uploadProgress} label={`${uploadProgress}%`}/>}
        </div>
        </Modal.Body>
        <Modal.Footer >
        <label className={styles.inputLabel} htmlFor="xray">Add Images</label>
          <input
            type="file"
            id="xray"  
            className={styles.inputHidden}
            accept="image/*" 
            onChange={(event)=>{onChange(event)}}                                   
            name="xray" 
            multiple
          />
          <Button onClick={props.onHide}>Close</Button>
          
        </Modal.Footer>
      </div>
       
      </Modal>
    );
  }

export default PatientImages