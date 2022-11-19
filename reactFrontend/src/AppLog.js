import React from 'react';
import {Login} from './Pages/Login'
import './App.css'


// function useState(initVal){
//   let state = initVal 
//   const setState = (newVal) => {
//     state = newVal
//   }

//   return [state, setState];
// }

function AppLog() {
    return(
        <div className="App">
            <Login/>
        </div>      
    );
}

export default AppLog;