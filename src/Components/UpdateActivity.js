import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function NewActivity({setUserMessage, activityId, activityName, activityDescription, setSuccessStatus}) {
    const [name, setName]= useState()
    const [description, setDescription]= useState()
    setUserMessage("")
    let navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(activityId)

        fetch(`https://fitness-tracker-backend.onrender.com/api/activities/${activityId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {  
                  name: name,
                  description: description,
                }
            )
        })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            setName();
            setDescription()
            if (result.id) { 
                setSuccessStatus(true)
                setUserMessage(`Activity, ${result.name}, was successfully updated`)
                navigate("/mymessages");
            }else {
                setSuccessStatus(false)
                setUserMessage("There was an error when updating your activity. Please try again")
                navigate("/mymessages");
            }
        })
        .catch(err=>console.error(err));

    }

  return (
    <div className="logIn_signUp_create_edit_container">
        <h1 className="pageTitle">Edit activity </h1>
        <form onSubmit={handleSubmit} className="form">
            <label>Name</label><br/>
            <input className="logIn_signUp_create_edit_entry" type="text" defaultValue={activityName} onSubmit={(event) => setName(event.target.value)} readonly="true" required/><br/>
            <label>Description</label><br/>
            <input className="logIn_signUp_create_edit_entry"  defaultValue={activityDescription} onChange={(event) => setDescription(event.target.value)}  onSubmit={(event) => setDescription(event.target.value)} required/><br/>
            <input className="submitButton" type="submit" value='Submit'></input>
        </form>
    </div>
  );
}

export default NewActivity;