import { useEffect, useState } from "react"
var nameField;
var bonefield;
var searchButton;

const SearchField =()=>{

    useEffect(()=>{
        nameField = document.getElementById("name");
        bonefield = document.getElementById("bone")
        searchButton = document.getElementById("search_button")
    },[])

    const [nameInput, updateName] = useState();
    const [boneInput, updateBone] = useState();

    const onSearchClick = () =>{
        console.log(nameInput,boneInput)
    }
    return(
        <div className="fr flex flex-column items-center w-40 fl tc ba bw1 b--light-blue br3 ma3 ">
            <div>
                <h3>Search Patients</h3>
            </div>
            <div>
            <label htmlFor="name">Name </label>
            <input id="name" type="text" name="name" className="mt2 ba b--silver br2"
                  onChange={e=>{updateName(e.target.value)}}></input>
            </div>
            <div>
            <label htmlFor="bone">Bone </label>
            <input id="bone" type="text" name="bone" className="mt2 ba b--silver br2 "
                  onChange={e=>{updateBone(e.target.value)}}></input>
            </div>
            <div>
            <input onClick={onSearchClick} type="button" id="search_button" value="Search" className="mt3 color-inherit bg-black-90 dim pointer mt1 mb2 ba b--silver br2"></input>
          </div>

        </div>
    )
}
export default SearchField