import tachyons from 'tachyons'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import {useRouter} from 'next/router'
import NewPatient from './NewPatient'
import SearchField from './SearchField'
import PatientCard from './PatientCard'
import { useEffect } from 'react'


const Dashboard = ({user, gotoLogin, gotoAddNew}) =>{
    var imagePath = user.imagePath;
    var image = `https://paddybaba.ddns.net/images/${imagePath}`
    var image2 = `https://paddybaba.ddns.net/xray/itf.jpeg`

    useEffect(()=>{
        localStorage.setItem("currentUser",JSON.stringify(user))
        console.log(user)
    },[])
    
    return(
        <div>
            <Head>
                <title>Dashboard</title>
                <meta name="viewport" content="width=device-width maximum-scale=1.5" ></meta>
            </Head>
            <div className={styles.container_dash}>
                <div className={styles.top}>
                    <h3 className="ma0">Surgery Log Software</h3>
                     <div className="flex justify-between">
                         
                             <h4 className="mt0 pa2 f5 ">{user.username}</h4>  
                            <img className={styles.profilepic} src={image}></img>                      
                      
                        <h4 onClick={()=>{gotoLogin()}} className="pointer grow f5 pa2">Logout</h4>
                        
                     </div>                
                </div>
            <div className="flex justify-between ma3 mt5">
                
                <NewPatient gotoAddNew={gotoAddNew}></NewPatient>
                <SearchField></SearchField>
            </div>
                <div className="mt-3">
                <h4>Recently Updated ...</h4>
                <div className={styles.scrollX}>
                    <PatientCard image = {image2}></PatientCard>
                    <PatientCard image = {image2}></PatientCard>
                    <PatientCard image = {image2}></PatientCard>
                    <PatientCard image = {image2}></PatientCard>
                    <PatientCard image = {image2}></PatientCard>
                    <PatientCard image = {image2}></PatientCard>
                    <PatientCard image = {image2}></PatientCard>
                    <PatientCard image = {image2}></PatientCard>
                    <PatientCard image = {image2}></PatientCard>
                    <PatientCard image = {image2}></PatientCard>
                    <PatientCard image = {image2}></PatientCard>
                    
                    
                </div>

            </div>
            
            
        </div>
        </div>
        
    )
}

export default Dashboard