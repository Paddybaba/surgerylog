import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Link from 'next/link'
import {useState} from 'react'
const LoginForm = ({gotoDashboard,gotoRegister, getUser}) =>{
    const [email_address, updateEmail] = useState("");
    const [password, updatePassword] = useState("");
  
    async function onLoginClick() {
        console.log("login Clicked");
        const data = {
              email:email_address,
              password:password
              }
          const response = await fetch('https://paddybaba.ddns.net/login',{
                              method:'POST',
                              headers:{"Content-type":"application/json"},
                              body:JSON.stringify(data)
                              })
          const datafetched = await response.json();
          if(datafetched.message == "OK"){
            const userDetails = {
              username : datafetched.user.username,
              imagePath : datafetched.user.imagePath,
              email_address : datafetched.user.email,
              phoneNumber:datafetched.user.phoneNumber
            }
            getUser(userDetails)
            console.log(userDetails)
            gotoDashboard();
            // alert("Welcome "+ datafetched.user.username)
            // console.log(datafetched.user)
            // userData = datafetched.user;
            // console.log(userData)
            // router.push({
            //   pathname:'\dashboard',
            //   query:userData
            // })
          }
          else if(datafetched.message == "FAIL"){
            alert(" Invalid Credentials !!!")
          }
          
        }

    return (
        <div className={styles.container}>
          <Head>
            <title>Surgery Log</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
          <main className="">
            <h1 className="f3 tc">
              Welcome to Surgery Log 
            </h1>     
    
            <form className="mw5 mw7-ns center bg-transparent pa3 ba b--silver br3">
              <div>
                <label htmlFor="email_address">Email </label><br></br>
                <input 
                    id="email_address" 
                    type="email" 
                    name="email_address" 
                    className="mt1 ba b--silver br2"
                    pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/" 
                    onChange={e=>{updateEmail(e.target.value)}}></input>
              </div>
              <div>
                <label htmlFor="password">Password </label><br></br>
                <input id="password" type="password" name="password" className="mt1 ba b--silver br2"
                      onChange={e=>{updatePassword(e.target.value)}}></input>
              </div>
              <div>
                <input onClick={onLoginClick} type="button" id="submit_login" value="Submit" className="color-inherit bg-black-90 dim pointer mt1 mb2 ba b--silver br2"></input>
              </div>
              <div>
              <h3 onClick={()=>{gotoRegister()}} className="pointer grow f5 pa2">New User, Register here</h3><br></br>
                {/* <Link href="/webpages/gudia">
                 <a>Go to gudia !!</a>
                </Link> */}
              </div>
              
            </form>
          </main>
        </div>
    )
}
export default LoginForm;