import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import tachyons from 'tachyons'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'

export default function Home() {
/////////LOGIN CONTROL/////////////////
    const [email_address, updateEmail] = useState("");
    const [password, updatePassword] = useState("");
    // const [currentUser, updateCurrentUser]=useState("");
    const router = useRouter();
    var userData = {};

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
          alert("Welcome "+ datafetched.user.username)
          userData = datafetched.user;
          console.log(userData)
          router.push({
            pathname:'\dashboard',
            query:userData
          })
        }
        else if(datafetched.message == "FAIL"){
          alert(" Invalid Credentials !!!")
        }
        
      }
      
///////////////////////////////////////
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
            <Link href="/register">
             <a >New User, register here !!</a>
            </Link><br></br>
            {/* <Link href="/webpages/gudia">
             <a>Go to gudia !!</a>
            </Link> */}
          </div>
          
        </form>
      </main>
    </div>
  )
}



