import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import tachyons from 'tachyons'
import {useEffect, useState} from 'react'
import LoginForm from '../Components/LoginForm'
import Register from '../Components/register'
import Dashboard from '../Components/dashboard'
import AddPatientForm from '../Components/AddPatientForm'
export default function Home() {
   
    const [route, updateRoute] = useState("LOGIN");
    const [user, updateUser] = useState( {username:"", email : "", phoneNumber:"", imagePath:""})
    
    ////  PREVENT REFRESHING 
    useEffect(()=>{
      const   savedRoute = localStorage.getItem("currentRoute") || "LOGIN";
      const savedUser = JSON.parse(localStorage.getItem("currentUser")) || {username:"", email : "", phoneNumber:"", imagePath:""} ;
      updateRoute(savedRoute)
      updateUser(savedUser)
      if(savedUser.username){
        updateRoute("DASHBOARD")
      }
   
    },[])

    useEffect(()=>{
      localStorage.setItem("currentRoute",route);
    },[route])

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
    function gotoAddNew(){
      updateRoute("ADDNEW")
    }
   
///////////   CONDITIONAL RENDERING    ////////////////////////////
  
    switch(route){
      case "LOGIN" : return <LoginForm gotoDashboard={gotoDashboard} gotoRegister={gotoRegister} getUser={getUser}/>
      case "DASHBOARD" : return <Dashboard user={user} gotoLogin={gotoLogin} gotoAddNew={gotoAddNew}/>
      case "REGISTER" : return <Register gotoDashboard={gotoDashboard} gotoLogin={gotoLogin} getUser={getUser}/>
      case "ADDNEW" : return <AddPatientForm gotoDashboard={gotoDashboard} user={user}/>
    }
   
      }




