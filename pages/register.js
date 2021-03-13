import Head from 'next/head'
import Link from 'next/link'
import tachyons from 'tachyons'
import {useEffect, useState} from 'react'
import styles from '../styles/Home.module.css'
import {useRouter} from 'next/router'

var phoneField ;
var emailField ;
var passwordField;
var alertTextArea;
var userData ;


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

  /////////END VALIDATOR /////////////////

export default function Register(){

  ////////////// GETTING ELEMENTS ///////////////////
useEffect(()=>{
  phoneField = document.getElementById("mobile_number");
  emailField = document.getElementById("email_address"); 
  passwordField = document.getElementById("password")
  alertTextArea = document.getElementById("alert_message")
},[])

    const [name, updateName] = useState("Anup")
    const [email_address, updateEmail] = useState("");
    const [password, updatePassword] = useState("");
    const [mobile, updateMobile] = useState("")
    const router = useRouter();

    async function onRegisterClick() {
        const data = {
            email:email_address,
            username:name,
            password:password,
            phoneNumber : mobile
    }
    if(required())
    {
      if(isValidEmail(data.email) && isValidPhoneNumber(data.phoneNumber))
      {
        const response = await fetch('https://paddybaba.ddns.net/register',{
                            method:'POST',
                            headers:{"Content-type":"application/json"},
                            body:JSON.stringify(data)
                            })
        const datafetched = await response.json();
        if(datafetched.message == "OK"){
          userData = datafetched.user;
          alert(datafetched.user.username+ " registered successfully !!!")
          router.push({
            pathname:'\dashboard',
            query: userData
          })
        } else (alert("Error occured !! Try again"))
      }                  
      }
    }
    
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
          <div className="tc">
            <input onClick={onRegisterClick}
            type="button" id="submit_login" value="Submit" className="mt1 ba b--silver br2 color-inherit bg-black-90"></input>
          </div>
          <div>
            <p className="tc red f7" id="alert_message"></p>
          </div>
          <div>
          <Link href="/">
             <a className="f6">Already registered, Login</a>
            </Link>
          </div>
        </form>
        </main>
        </div>
    )
}
