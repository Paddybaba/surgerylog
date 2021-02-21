import validator from 'validator';
import Head from 'next/head'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import tachyons from 'tachyons'

const required = (value) =>{
    if(!value.toString().trim().length){
        return 'required !!!'
    }
}
const email = (value) =>{
    if(!validator.isEmail(value)){
        return `${value} is not a valid email !!!`
    }
}
const mobileNumber = (value) =>{
    if(!validator.isMobilePhone(value)){
        return `${value} is not a valid mobile number !!!`
    }
}

const onRegisterClick = () =>{
    fetch('https://paddybaba.ddns.net/register',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        mode:'no-cors'
    })
    .then(console.log)
}

export default function Register(){
    return (
        <div className="flex vh-100 pa5 flex-column">
             <Head>
                <title>Surgery Log</title>
                <link rel="icon" href="/favicon.ico" />
             </Head>

        <main className="mt2">
            <h1 className="f3 tc">
             New User, Please register 
            </h1>
      

        <Form className="mw5-ns center bg-transparent pa3 ba b--silver br3">
        <div className="tc">
            <label className="tl" htmlFor="username">Name </label><br></br>
            <input id="username" type="text" name="username" className="mt1 ba b--silver br2"></input>
        </div>
        <div className="tc">
            <label htmlFor="mobile_number">Mobile Number* </label>
            <Input id="mobile_number" type="number" name="mobile_number" className="mt1 ba b--silver br2"
                    validations={[required, mobileNumber]}></Input>
        </div>
          <div className="tc">
            <label htmlFor="email_address">Email* </label><br></br>
            <Input 
                id="email_address" 
                type="email" 
                name="email_address" 
                className="mt1 ba b--silver br2"
                validations={[required, email]}></Input>
          </div>
          <div className="tc">
            <label htmlFor="password">Password* </label><br></br>
            <Input id="password" type="password" name="password" className="mt1 ba b--silver br2"></Input>
          </div>
          <div className="tc">
            <input onClick={onRegisterClick}
            type="button" id="submit_login" value="Submit" className="mt1 ba b--silver br2"></input>
          </div>
        </Form>
        </main>
        </div>
    )
}