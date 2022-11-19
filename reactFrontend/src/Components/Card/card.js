import React from "react";

export const Card = ({listOfTodos}) => {
    return (
    <div>
        {listOfTodos.map(link => {
            return(
                <div id="cubo">
                {/* <!-- Product image--> */}
                <img src={link.link} alt="..." id="image"/>
                {/* <!-- Product details--> */}
                <div>
                    <div>
                        {/* <!-- Product name--> */}
                        <h5 id="title">Welcome to BoardLab!</h5>
                    </div>
                </div>
            </div>
            )
            })}
    </div>
    )
}
