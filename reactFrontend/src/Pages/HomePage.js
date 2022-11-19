import React, { useEffect, useState } from "react";
import {Card} from '../Components/Card/card'

export const HomePage = () =>{
    const [links, setLinks] = useState([])

    useEffect(() =>{
        fetch('http://54.226.54.44:3001/home').then(response => {
            if(response.ok){
                return response.json()
            }
        }).then(data => setLinks(data))
    },[])

    return (
    <div>
      <Card listOfTodos={links}/>
    </div>)
}


