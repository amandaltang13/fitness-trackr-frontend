import React from "react";
import { Link, useNavigate } from "react-router-dom";
function Login({username, setUsername, password, setPassword, setToken, setCurrentUsername, setUserMessage, setSuccessStatus}) {

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch('https://fitness-tracker-backend.onrender.com/api/users/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          username: username,
          password: password,
        }
      )
    })          
    .then(response => response.json())
    .then(result => {
      console.log(result);
        setUsername("");
        setPassword("");
      if (result.message === "you're logged in!") {
        setUserMessage("You're logged in! Please wait while we load your routines." )
        setSuccessStatus(true)
        window.localStorage.setItem("username", result.user.username);
        window.localStorage.setItem("token", result.token);
        setCurrentUsername(window.localStorage.getItem("username"));
        setToken(window.localStorage.getItem("token"));
        navigate("/mymessages");
      } else if (result.error === "CredentialsError" ){
        setUserMessage("Username or password is incorrect. Please try again")
        setSuccessStatus(false)
        navigate("/mymessages");
      } else if (result.error === "User not found"){
        setUserMessage(result.message);
        setSuccessStatus(false);
        navigate("/mymessages");
      } else {
        setUserMessage(`Sorry there was an error logging you in. Please try again`)
        setSuccessStatus(false)
        navigate("/mymessages")
      }
    })
    .catch(err=>console.error(err));
  }

  return (
    <div className="logIn_signUp_create_edit_container">
        <h1 className="pageTitle">Log In </h1>
        
        <form onSubmit={handleSubmit} className="form">
            <label>User Name</label><br/>
            <input className="logIn_signUp_create_edit_entry" type="text" value={username} onChange={(event) => setUsername(event.target.value)} required/><br/>
            <label>Password</label><br/>
            <input className="logIn_signUp_create_edit_entry" type="password" value={password} onChange={(event) => setPassword(event.target.value)}  required/><br/>
            <input className="submitButton" type="submit" ></input>
        </form>
        <Link className="signUp_NewActivity_Link" to="/signup">Don't have an account? Sign Up here!</Link>
    </div>
  );
}

export default Login;