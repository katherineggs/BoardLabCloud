import React from 'react';
// import { BrowserRouter as Router, Switch, 
//     Route, Redirect,} from "react-router-dom";
import {SignUp} from './Pages/SignUp'
import './App.css'


// function useState(initVal){
//   let state = initVal 
//   const setState = (newVal) => {
//     state = newVal
//   }

//   return [state, setState];
// }

function AppSign() {
    return(
        <div className="App">
            <SignUp/>
        </div>
        // <Router>
        //     <Switch>
        //     <Route exact path="/" component={Login} />
        //     <Route path="/signup" component={SignUp} />                
        //     <Route path="/home" component={HomePage} />
                
        //     {/* If any route mismatches the upper 
        //     route endpoints then, redirect triggers 
        //     and redirects app to home component with to="/" */}
        //     <Redirect to="/" />
        //     </Switch>
        // </Router>
      
    );
}

export default AppSign;