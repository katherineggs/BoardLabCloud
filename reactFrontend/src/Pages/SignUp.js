import React, { useEffect, useState } from "react";
import {User} from '../Components/User/user'
import {SignUpForm} from '../Components/Form/signUpForm'

export const SignUp = () =>{
    // const [ans, setAns] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const handleFormChange = (inputUserName,inputUserPwd,inputUserEmail) => {
        setUsername(inputUserName)
        setPassword(inputUserPwd)
        setEmail(inputUserEmail)
        console.log("SIGNUP username ",username)
        console.log("SIGNUP password ",password)
        console.log("SIGNUP email ",email)
    }

    const handleFormSubmit = () => {
        // fetch('http://ip-172-31-26-169.ec2.internal/signup',{
        // fetch('http://ec2-3-80-73-16.compute-1.amazonaws.com:3001/signup',{ // ESTE HIZO ALGO
        // fetch('http://172.31.26.169:3001/signup',{
        fetch('http://18.206.212.196:3001/signup',{ // ESTE HIZO LO MISMO
            method:'POST',
            body:JSON.stringify({
                username:username,
                password:password,
                email:email
            }),
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            }
        }).then(response=>response.json())
        .then(message=>{
            console.log(message)
            setUsername('')
            setPassword('')
            setEmail('')
            // aqui creo que deberiamos de cambiar de pagina
        })
    }


    return (
    <div>
        <SignUpForm userinput={[username,password,email]} 
        onFormChange={handleFormChange}
        onFormSubmit={handleFormSubmit}/>
    </div>)
}


