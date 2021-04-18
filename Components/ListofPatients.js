import {ListGroup} from 'react-bootstrap'
import PatientBanner from './PatientBanner'
import styles from '../Components/Components.module.css'

const ListofPatients = ({data, getPatientDetails}) =>{
   
return(
        <ListGroup className={styles.listBox}>
             {
                data.map((patient, index)=>{
                return <PatientBanner key={index} patient={patient} getPatientDetails={getPatientDetails}/>                        })
                }
        </ListGroup>
)
}
export default ListofPatients;