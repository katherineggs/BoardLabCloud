import React, { useState } from "react";

export const LoginForm = ({userName, userPwd, onFormChange, onFormSubmit})=>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleChange = () => {
        onFormChange(username, password)
    }
    const handleSubmit = (event) =>{
        event.preventDefault()
        onFormSubmit()

    }
    return(
        <div>
			<form onSubmit={handleSubmit} action="#" method="post">
				<span>Sign In</span>

				{/* <!-- inputs --> */}
				<div data-validate="Please enter username">
					<input id="username" name="username" type="text" 
					placeholder="Username" value={userName}
					onChange={(event)=>handleChange(event, setUsername(event.target.value))}/>
					<span></span>
				</div>

				<div data-validate = "Please enter password">
					<input id="password" name="password" type="password" 
					placeholder="Password" value={userPwd} 
					onChange={(event)=>handleChange(event, setPassword(event.target.value))} />
					<span></span>
				</div>

				{/* <!-- forgot password --> */}
				<div>
					<span>Forgot</span>
					<a href="#">Username / Password?</a>
				</div>

				{/* <!-- button--> */}
				<div>
					<button>Sign in</button>
				</div>

				{/* <!-- signup --> */}
				<div >
					<span>Don’t have an account?</span>
					<a href="#">
						Sign up now
					</a>
				</div>

			</form>
		</div>
    )
}