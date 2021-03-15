import styles from '../Components/Components.module.css'

const PatientCard = () =>{
    return(
        <div className={styles.pCard}>
            <img src="/images/demoXRay.jpg" alt=""></img>
            <h4 className={styles.fTitle}>Mayank Kumar</h4>
            <h5 className={styles.fDate}>Admit : 13/03/21</h5>
            <h5 className={styles.fDate}>Disch : 15/03/21</h5>
        </div>
    )
}
export default PatientCard