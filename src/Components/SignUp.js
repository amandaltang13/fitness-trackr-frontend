import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function SignUp({username, setUsername, password, setPassword, setCurrentUsername, setToken, setUserMessage, setSuccessStatus}) {
    const [passwordConfirm, setPasswordConfirm] = useState("");
    let navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault()

        if (password === passwordConfirm) {

            if (password.length > 8) {

                fetch('https://fitness-tracker-backend.onrender.com/api/users/register', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            username: username,
                            password: password
                        }
                    )
                })
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    setUsername("")
                    setPassword("")
                    setPasswordConfirm("")
                    if (result.message === "thank you for signing up"){   
                        setUserMessage(`Thanks for signing up. Now create some routines and get active!`)
                        setSuccessStatus(true)
                        window.localStorage.setItem("token", result.token)
                        window.localStorage.setItem("username", result.user.username)
                        setToken(window.localStorage.getItem("token"))
                        setCurrentUsername(window.localStorage.getItem("username"))
                        navigate("/mymessages")  
                    } else if (result.error === "User name taken"){
                        setUserMessage(`${username} is already in use. Sign in or use another username`)
                        setSuccessStatus(false)
                        navigate("/mymessages")  
                    } else {
                        setUserMessage(`Sorry there was an error setting up your account. Please try again`)
                        setSuccessStatus(false)
                        navigate("/mymessages") 
                    }
                })
                .catch(err=>console.error(err));

            } else {
                setUserMessage(`Password must be at least nine characters. Please select another`)
                setSuccessStatus(false)
                navigate("/mymessages") 
            }
            
        } else {
            alert("Passwords do not match. Try Again");
        }
    } 

  return (
    <div className="logIn_signUp_create_edit_container">
        <h1 className="pageTitle">Sign Up </h1>
        <form onSubmit={handleSubmit} className="form">
            <label>User Name</label><br/>
            <input className="logIn_signUp_create_edit_entry" type="text" value={username} onChange={(event) => setUsername(event.target.value)} required/><br/>
            <label>Password</label><br/>
            <input className="logIn_signUp_create_edit_entry" type="password" value={password} onChange={(event) => setPassword(event.target.value)}  required/><br/>
            <label>Re-enter Password</label><br/>
            <input className="logIn_signUp_create_edit_entry" type="password" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} required/><br/>
            <input className="submitButton" type="submit" value='Submit'></input>
        </form>
    </div>
  );
}

export default SignUp;