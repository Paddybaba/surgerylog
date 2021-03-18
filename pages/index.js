import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import tachyons from 'tachyons'
import {useEffect, useState} from 'react'
import LoginForm from '../Components/LoginForm'
import Register from '../Components/register'
import Dashboard from '../Components/dashboard'
export default function Home() {
   
    const [route, updateRoute] = useState("LOGIN");
    const [user, updateUser] = useState({username:"", email_address : "", phoneNumber:"", imagePath:""})

    const getUser = (user) =>{
      updateUser(user)
    }
    function gotoDashboard(){
     updateRoute("DASHBOARD")
    }
      
    function gotoLogin(){
      updateRoute("LOGIN")
    }
    function gotoRegister(){
      updateRoute("REGISTER")
    }
///////////   CONDITIONAL RENDERING    ////////////////////////////
  
    switch(route){
      case "LOGIN" : return <LoginForm gotoDashboard={gotoDashboard} gotoRegister={gotoRegister} getUser={getUser}/>
      case "DASHBOARD" : return <Dashboard user={user} gotoLogin={gotoLogin}/>
      case "REGISTER" : return <Register gotoDashboard={gotoDashboard} gotoLogin={gotoLogin} getUser={getUser}/>
    }
   
      }




