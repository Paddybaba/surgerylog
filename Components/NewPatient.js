import tachyons from 'tachyons'

const NewPatient = () =>{
    return (
        <div className="flex flex-column items-center w-20 fl grow tc ba bw1 b--light-blue br3 ma3 ">
            <img src={"/images/addpatient.png"} className="w-40 mt3"></img>
            <h3 className="f4">Add New Patient</h3>
        </div>
    )
}
export default NewPatient