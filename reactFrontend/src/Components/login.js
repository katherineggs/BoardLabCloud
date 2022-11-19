import React,{ UseState } from 'react'

import API from './API'
// import login from './Components/login'

function login() {

  const [userName, setUserName] = UseState('')
  const [pwd, setPwd] = UseState('')

  function logMeIn(event) {
    //       API.postFunc({userName,pwd},"/")
    //       .then((response) => logedIn(response))
    //       .catch(error => console.log('error',error))
    //   }
    API.postFunc({userName,pwd},"/")
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })

    event.preventDefault()
  }
  const handleSubmit=(event)=>{ 
          event.preventDefault()
          logMeIn()
          setUserName('')
          setPwd('')
  }
  return(
    <div class="limiter">
        <div class="container-login100">
            <div class="wrap-login100">
                <form onSubmit={handleSubmit} method="post" class="login100-form validate-form p-l-55 p-r-55 p-t-178">
                    <span class="login100-form-title">Sign In</span>

                    {/* inputs */}
                    <div class="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                        <input id="username" name="username" class="input100" type="text" placeholder="Username"  value={userName} onChange={(e)=>setUserName(e.target.value)} />
                        <span class="focus-input100"></span>
                    </div>

                    <div class="wrap-input100 validate-input" data-validate = "Please enter password">
                        <input id="password" name="password" class="input100" type="password" placeholder="Password" value={pwd} onChange={(e)=>setPwd(e.target.value)} />
                        <span class="focus-input100"></span>
                    </div>

                    {/* forgot password */}
                    <div class="text-right p-t-13 p-b-23">
                        <span class="txt1">Forgot</span>
                        {/* <a href="#" class="txt2">Username / Password?</a> */}
                    </div>

                    {/* button */}
                    <div class="container-login100-form-btn">
                        <button class="login100-form-btn">Sign in</button>
                    </div>

                    {/* signup */}
                    <div class="flex-col-c p-t-170 p-b-40">
                        <span class="txt1 p-b-9">Don’t have an account?</span>

                        {/* <a href="#" class="txt3"> */}
                            Sign up now
                        {/* </a> */}
                    </div>
                </form>
            </div>
        </div>
    </div>
)
;
}

export default login;

// export default App;