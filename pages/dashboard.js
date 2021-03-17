import tachyons from 'tachyons'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
// import MyApp from '../pages/_app'
import {useRouter} from 'next/router'
import NewPatient from '../Components/NewPatient'
import SearchField from '../Components/SearchField'
import PatientCard from '../Components/PatientCard'


const Dashboard = () =>{
    const router = useRouter();
    var image = "/images/demoXRay.jpg"
    // console.log(router.query)
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
                        <h4 className="mt0 pa2 f5 ">{`Logged in as ${router.query.username}`}</h4>
                        <Link href="/">
                            <h4 className="pointer grow f5 pa2">Logout</h4>
                        </Link>
                     </div>                
                </div>
            <div className="flex justify-between ma3 mt5">
                <NewPatient></NewPatient>
                <SearchField></SearchField>
            </div>
                <div className="mt-3">
                <a href="https://paddybaba.ddns.net/picupload">Photo Upload</a>
                <h4>Recently Updated ...</h4>
                <div className={styles.scrollX}>
                    <PatientCard image = {image}></PatientCard>
                    <PatientCard image = {image}></PatientCard>
                    <PatientCard image = {image}></PatientCard>
                    <PatientCard image = {image}></PatientCard>
                    <PatientCard image = {image}></PatientCard>
                    <PatientCard image = {image}></PatientCard>
                    <PatientCard image = {image}></PatientCard>
                    <PatientCard image = {image}></PatientCard>
                    <PatientCard image = {image}></PatientCard>
                    <PatientCard image = {image}></PatientCard>
                    <PatientCard image = {image}></PatientCard>
                    
                </div>

            </div>
            
            
        </div>
        </div>
        
    )
}

export default Dashboard