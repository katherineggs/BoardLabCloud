import React, { useState } from "react";

export const SignUpForm = ({userName, userPwd, userEmail, onFormChange, onFormSubmit})=>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const handleChange = () => {
        onFormChange(username, password, email)
    }
    const handleSubmit = (event) =>{
        event.preventDefault()
        onFormSubmit()

    }
    return(
        <div>
				<form onSubmit={handleSubmit} action="#" method="post">
					<span>Sign Up</span>

                    {/* <!-- inputs --> */}
					<div data-validate="Please enter username">
						<input id="username" name="username" type="text" 
                        placeholder="Username" value={userName}
                        onChange={(event)=>
                        handleChange(event, setUsername(event.target.value))}
                        />
					</div>

                    <div data-validate="Please enter username">
						<input id="email" name="email" type="email" 
                        placeholder="Email" value={userEmail}
                        onChange={(event)=>
                        handleChange(event, setEmail(event.target.value))}
                        />
					</div>

					<div data-validate = "Please enter password">
						<input id="password" name="password" type="password" 
                        placeholder="Password" value={userPwd}
                        onChange={(event)=>
                        handleChange(event, setPassword(event.target.value))}
                        />
					</div>

                    {/* <!-- button--> */}
					<div>
						<button>Sign up</button>
					</div>
				</form>
			</div>
    )
}