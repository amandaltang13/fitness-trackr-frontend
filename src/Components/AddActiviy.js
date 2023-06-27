import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function AddActivity({setUserMessage, routineId, setRoutineId, setSuccessStatus}) {
    const [count, setCount]= useState("")
    const [duration, setDuration]= useState("")
    const [allActivities, setAllActivities] = useState([])
    const [singleActivity, setSingleActivity] = useState({})
    console.log(singleActivity)
    console.log(allActivities)
    console.log(routineId)

    let navigate = useNavigate();
    useEffect(() => {  
        fetch('https://fitness-tracker-backend.onrender.com/api/activities', {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(result => {
            setAllActivities(result);
        })
        .catch(err=>console.error(err));

    },[]);
    const handleSubmit = (event) => {
        event.preventDefault()

        if(singleActivity.length > 0 ){
            const activityId = singleActivity[0].id
            console.log(activityId)

            fetch(`https://fitness-tracker-backend.onrender.com/api/routines/${routineId}/activities`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                    routineId: routineId,
                    activityId: activityId,
                    count: count,
                    duration: duration,
                    }
                )
            }) 
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setCount("");
                setDuration("");
                if (result.id) { 
                    setSuccessStatus(true)
                    setUserMessage("We added that activity to your routine")
                    navigate("/mymessages");
                }else if (result.error === "Activity already exists on routine" ){
                    setSuccessStatus(false)
                    setUserMessage("That activity is already part of your routine. Please choose another.")
                    navigate("/mymessages");
                }else {
                    setSuccessStatus(false)
                    setUserMessage("There was an error adding that activity to your routine. Please try again")
                    navigate("/mymessages");
                }
            })
            .catch(err=>console.error(err));
        } else {
            console.log("you must choose an singleActivity")
        }
    }
  return (
    <div className="setUpActivity_container">
        <h1 className="pageTitle">Add an Activity </h1>
        <form onSubmit={handleSubmit} className="form">
            <label>Choose an Activity</label><br/>
            <select 
            className="selectActivity" 
            onChange={(event)=>setSingleActivity(allActivities.filter((singleActivity) => singleActivity.name === event.target.value))}> 
                <option></option>
                {allActivities.map((singleActivity, index) =>
                <option key={ `${ index }:${ singleActivity.name }`}>{singleActivity.name}</option>)}
            </select><br/>
            <label>Duration</label><br/>
            <input className="setUpActivity_entry" type="text" onChange={(event) => setDuration(event.target.value)} required/><br/>
            <label>Count</label><br/>
            <input className="setUpActivity_entry" type="text" onChange={(event) => setCount(event.target.value)} required/><br/>
            <input className="submitButton" type="submit" value='Submit'></input>
        </form>
        <Link className="signUp_NewActivity_Link" to="/newactivity">Activity you want isn't here? Create it!</Link>
    </div>
  );
}

export default AddActivity;