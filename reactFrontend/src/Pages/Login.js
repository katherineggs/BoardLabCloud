import React, { useEffect, useState } from "react";
import {LoginForm} from '../Components/Form/loginForm'
import AppHome from '../AppHome';
import $ from 'jquery'


export const Login = () =>{
    // const [ans, setAns] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleFormChange = (inputUserName,inputUserPwd) => {
        setUsername(inputUserName)
        setPassword(inputUserPwd)
        console.log("LOGIN username ",username)
        console.log("LOGIN password ",password)
    }

    // const handleFormSubmit = () => {
    //     fetch('http://54.226.54.44:3001/',{
    //         method:'POST',
    //         body:JSON.stringify({
    //             username:username,
    //             password:password
    //         }),
    //         headers:{
    //             "Content-type":"application/json;"
    //         }
    //     }).then((response)=>{
    //         if(response.ok){
    //             response.json()
    //             console.log(response)
    //         }
    //     // }).then(data=>{
    //     //     console.log(data)
    //         // if(message['answer'] == "Correct"){
    //         //     return <AppHome/>
    //         // }
    //     }).then((value)=>{
    //         console.log(value)
    //     })

    // }

    $("button").click(function(){
        $.post("http://54.226.54.44:3001/",
        {
            username:username,
            password:password
        },
        function(data, status){
          alert("Data: " + data + "\nStatus: " + status);
        });
      });

    return (
    <div>
        <LoginForm userinput={[username,password]} 
        onFormChange={handleFormChange}
        onFormSubmit={handleFormSubmit}/>
    </div>)
}


