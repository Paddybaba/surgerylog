import { useEffect, useState } from "react"
import styles from '../Components/Components.module.css'

var nameField;
var bonefield;
var searchButton;

const SearchField =({getRecent, getPatientList})=>{

    useEffect(()=>{
        nameField = document.getElementById("name");
        bonefield = document.getElementById("bone")
        searchButton = document.getElementById("search_button")
    },[])

    // const [nameInput, updateName] = useState();
    // const [boneInput, updateBone] = useState();

    // const onSearchClick = () =>{
    //     console.log(nameInput,boneInput)
    // }
    return(
        <div className={styles.search}>
            <div>
                <h3 className="f6">Search Patients</h3>
            </div>
            <div>
            <label htmlFor="name" className="f6 ph2">Name </label>
            <input id="name" type="text" name="name" className={styles.entry}
                  onChange={e=>{getPatientList(e.target.value)}}></input>
            </div>
            {/* <div>
            <label htmlFor="bone f7 ph3" className="f6 ph2">Bone </label>
            <input id="bone" type="text" name="bone" className={styles.entry}
                  onChange={e=>{updateBone(e.target.value)}}></input>
            </div> */}
            <div>
            <input  onClick={()=>{getRecent();}} type="button" id="search_button" value="Recently Updated" className="mt2 color-inherit bg-black-90 dim pointer mt1 mb2 ba b--silver br2"></input>
          </div>
          {/* "fr flex flex-column items-center w-40 fl tc ba bw1 b--light-blue br3 " */}

        </div>
    )
}
export default SearchField