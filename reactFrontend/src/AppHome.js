import React from 'react';
import {HomePage} from './Pages/HomePage'
import './App.css'


// function useState(initVal){
//   let state = initVal 
//   const setState = (newVal) => {
//     state = newVal
//   }

//   return [state, setState];
// }

function AppHome() {
    return(
        <div className="App">
            <HomePage/>
        </div>      
    );
}

export default AppHome;