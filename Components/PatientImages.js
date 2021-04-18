// import {div, Row,Col} from 'react-bootstrap'
import {Modal, Button} from 'react-bootstrap'
import styles from '../Components/Components.module.css'  
import Resizer from "react-image-file-resizer";
import axios from 'axios';

var allImages;
const showImages = async  (patient_id) =>{
  const response = await axios.post("https://paddybaba.ddns.net/showImages",{patient_id})
  const imageArray = await response.data;
  allImages = imageArray
  
}

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
  function PatientImages(props) {
    const {xrayPaths, patient, user, ...rest} = props
    allImages = xrayPaths;
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
              const response = axios.post("https://paddybaba.ddns.net/newImages", fd)
              if(response){
                //// REFERESH IMAGES
                showImages(patient.patient_id); /////NOT WORkiNG
              }
              }catch (err) {
              console.log(err);
            }
            };

    
    var xray = `https://paddybaba.ddns.net/xray/${xrayPaths[0].xraypath}`;
    // console.log(xrayPaths[0].xraypath)
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
                 allImages.map((element, index)=>{
                    return <img onClick={(event)=>{imageClick(event.target)}} className={styles.xrayFilms} src={`https://paddybaba.ddns.net/xray/${element.xraypath}`} key={index}/>
                 })
              
               }
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