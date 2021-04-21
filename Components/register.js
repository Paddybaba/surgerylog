import Head from 'next/head'
import axios from 'axios'
import Resizer from 'react-image-file-resizer'
import {useEffect, useState} from 'react'
import styles from '../styles/Home.module.css'


var phoneField ;
var emailField ;
var passwordField;
var alertTextArea;
var profileImageField;


//////VALIDATOR////////////////////////////////

const isValidEmail = (em) =>{
  const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
 if (em.match(mailFormat))
  {
    console.log("email address is valid")
    emailField.style.color = "black";
    return (true)
  }
    emailField.focus();
    emailField.style.color = "red";
    alert("You have entered an invalid email address!")
    return (false)
}
const isValidPhoneNumber =(num)=>
{
  var phoneno = /^\d{10}$/;
  if(num.match(phoneno))
        {
          console.log("phone Number is valid")
          phoneField.style.color = "black";
         return true;
        }
      else
        {
          phoneField.focus();
          phoneField.style.color = "red";
        alert("Not a valid Phone Number");
        return false;
        }
  }

  const required = () =>{
    if(phoneField.value == "" || emailField.value == "" || passwordField.value =="")
    {
      console.log(phoneField.value, emailField.value, passwordField.value)
      alertTextArea.innerHTML = "* Fill all the required fields"
      return false;
    }
    alertTextArea.innerHTML = "";
    console.log(phoneField.value, emailField.value, passwordField.value)
    return true;
  }
//___________________________________________________________________________

//// Main function >>>>>>>>>>>>>>>>>>>>>>>>  

export default function Register({gotoDashboard, gotoLogin, getUser}){
  ////////////// GETTING ELEMENTS ///////////////////
useEffect(()=>{
  phoneField = document.getElementById("mobile_number");
  emailField = document.getElementById("email_address"); 
  passwordField = document.getElementById("password")
  alertTextArea = document.getElementById("alert_message")
  profileImageField = document.getElementById("pp") 
},[])
  
    const [name, updateName] = useState("Anup")
    const [email_address, updateEmail] = useState("");
    const [password, updatePassword] = useState("");
    const [mobile, updateMobile] = useState("");
    const [profile_pic, updatePP] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    let fd = new FormData();
 ////1. ///////// RESIZE IMAGE FILE BEFORE UPLOADING
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
      // console.log(event)
      let image = [];
     try {
      const file = event.target.files;
      image.push(await resizeFile(file[0]))
      fd.append("profile_image", image[0])
      console.log(image[0])
      }catch(err){
        console.log(err)
      }
    }
      //////UPLOAD PROGRESS CONFIG 
      var config = {
        onUploadProgress: function(progressEvent) {
          var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
          setUploadProgress(percentCompleted);
        }
      };
    /////////// APPEND DATA TO FD
    const data = {
      email:email_address,
      username:name,
      password:password,
      phoneNumber : mobile,
    }
    try{
    fd.append("data", JSON.stringify(data))
    }catch(err){
      console.log(err.code)
    }
  
      ///////  PUSH TO THE SERVER USING FORM DATA
    async function onRegisterClick() {
           
         if(required())
          {
            if(isValidEmail(data.email) && isValidPhoneNumber(data.phoneNumber))
            {
              const response = await axios.post("https://paddybaba.ddns.net/register", fd, config)
              console.log(await response.data.message)
             if(response){
                  const datafetched = await response.data;
                   if (datafetched.message == "OK"){
                      console.log(datafetched.user)
                      getUser(datafetched.user)
                      alert(datafetched.user.username+ " registered successfully !!!")
                      gotoDashboard();
                    } else if(datafetched.message == "FAILED"){
                      (alert("Error occured !! Try again"))
                    } else if(datafetched.message == "No file uploaded") {
                      (alert("Profile photo not selected !!!"))
                    }
                    } 
              
            }                  
          }
            
        }
        ;
    
          // console.log(data)
              // if(required())
              // {
              //   if(isValidEmail(data.email) && isValidPhoneNumber(data.phoneNumber))
              //   {
              //     const response = await fetch('https://paddybaba.ddns.net/register',{
              //                         method:'POST',
              //                         headers:{"Content-type":"application/json"},
              //                         body:JSON.stringify(data)
              //                         })
              //     const datafetched = await response.json();
              //     if(datafetched.message == "OK"){
              //       console.log(datafetched.user)
              //       getUser(datafetched.user)
              //       alert(datafetched.user.username+ " registered successfully !!!")
              //       gotoDashboard();
              //     } else if(datafetched.message == "FAILED"){
              //       (alert("Error occured !! Try again"))
              //     }
              //   }                  
              //   }
        
    
    return (
        <div className={styles.container}>
             <Head>
                <title>Surgery Log</title>
                <link rel="icon" href="/favicon.ico" />
             </Head>

        <main className="mt2">
            <h1 className="f3 tc">
             New User, Please register 
            </h1>
      

        <form className="mw5-ns center bg-transparent pa3 ba b--silver br3">
        <div className="">
            <label className="tl" htmlFor="username">Name </label><br></br>
            <input id="username" type="text" name="username" className="ma2 ba b--silver br2"
                    onChange={e=>{updateName(e.target.value)}}></input>
        </div>
        <div className="">
            <label htmlFor="mobile_number">Mobile Number* </label>
            <input id="mobile_number" type="number" name="mobile_number" className="ma2 ba b--silver br2"
                    onChange={e=>{updateMobile(e.target.value)}}></input>
        </div>
          <div className="">
            <label htmlFor="email_address">Email* </label><br></br>
            <input 
                id="email_address" 
                type="email" 
                name="email_address" 
                onChange={e=>{updateEmail(e.target.value)}}
                className="ma2 ba b--silver br2 black"
                ></input>
          </div>
          <div className="">
            <label htmlFor="password">Password* </label><br></br>
            <input id="password" type="password" name="password" className="ma2 ba b--silver br2"
                    onChange={e=>{updatePassword(e.target.value)}}></input>
          </div>
          <div>
            <label htmlFor="pp">Profile Photo</label>
            <input  className="ma2 ba b--silver br2 w-90" 
                    id="pp" 
                    type="file" 
                    name="profile_photo" 
                    accept="image/*"
                    onChange = {(event) =>{onChange(event)}}></input>
          </div>
          <div className="tc">
            <input onClick={onRegisterClick}
            type="button" id="submit_login" value="Submit" className="mt1 ba b--silver br2 color-inherit bg-black-90"></input>
          </div>
          <div>
            <p className="tc red f7" id="alert_message"></p>
          </div>
          <div>
          <h4 onClick={()=>{gotoLogin()}} className="pointer grow f5 pa2">Already Registered... Login</h4>
          </div>
        </form>
        </main>
        </div>
    )
}