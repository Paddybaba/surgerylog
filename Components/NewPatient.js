import tachyons from 'tachyons'
import styles from '../Components/Components.module.css'

const NewPatient = () =>{
    return (
        
        <div className={styles.card}>
            <img src={"/images/addpatient.png"} className="w-50 mt2"></img>
            <h3 className="f6 tc">Add New Patient</h3>
        </div>
        // "flex flex-column items-center w-20 fl grow tc ba bw1 b--light-blue br3 ma3 "

        // <div className="card" style="width: 18rem;">
        //     <img className="card-img-top" src="/images/addpatient.png" alt="Add Patient"></img>
        //      <div className="card-body">
        //         <h5 className="card-title">Add New Patient</h5>
        //          {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
        //          <a href="#" className="btn btn-primary">Add New Patient</a>
        //      </div>
        // </div>
    )
}
export default NewPatient