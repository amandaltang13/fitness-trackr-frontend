import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function NewActivity({token, setUserMessage, setSuccessStatus}) {
    const [name, setName]= useState("")
    const [description, setDescription]= useState("")
    setUserMessage("")
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch('https://fitness-tracker-backend.onrender.com/api/activities', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                  name: name.trim().toLowerCase(),
                  description: description,
                }
            )
        })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            setName("");
            setDescription("");
            if (result.id) { 
                setSuccessStatus(true)
                setUserMessage("Thanks for creating an activity. We are loading your routines so you can add it!")
                navigate("/mymessages");
            }else if(result.error === "Activity already exists" ){
                setSuccessStatus(false)
                setUserMessage(result.message)
                navigate("/mymessages");
            }else{
                setSuccessStatus(false)
                setUserMessage("There was an error creating your activity. Please try again")
                navigate("/mymessages");
            }
        })
        .catch(err=>console.error(err));

    }

  return (
    <div className="logIn_signUp_create_edit_container">
        <h1 className="pageTitle">Create a new activity </h1>
        <form onSubmit={handleSubmit} className="form">
            <label>Name</label><br/>
            <input className="logIn_signUp_create_edit_entry" type="text" onChange={(event) => setName(event.target.value)} required/><br/>
            <label>Description</label><br/>
            <input className="logIn_signUp_create_edit_entry" type="text" onChange={(event) => setDescription(event.target.value)} required/><br/>
            <input className="submitButton" type="submit" value='Submit'></input>
        </form>
    </div>
  );
}

export default NewActivity;