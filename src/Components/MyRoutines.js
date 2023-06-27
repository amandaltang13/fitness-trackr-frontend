import React, { useEffect } from "react";
import {Link} from 'react-router-dom';
function MyRoutines({setRoutineId, token, currentUsername, userRoutines, setUserRoutines, setRoutineActivityId, setRoutineName, setRoutineGoal, setRoutineActivityCount, setRoutineActivityDuration }){
    console.log("token:",token);
    const handleDeleteRoutine = async (routineId) => {
        fetch(`https://fitness-tracker-backend.onrender.com/api/routines/${routineId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
        }
        }).then(response => response.json())
        .then(result => {
            console.log(result);
        })
        .catch(console.error);
        getUserRoutines();       
            }
    const handleDeleteRoutineActivity = async (routineActivityId) => {
        console.log("routineActivityId:",routineActivityId)
        fetch(`https://fitness-tracker-backend.onrender.com/api/routine_activities/${routineActivityId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
        }
        }).then(response => response.json())
        .then(result => {
            console.log(result);
        })
        .catch(console.error);
        getUserRoutines();       
            }   


    const getUserRoutines = async () => {
        
        console.log("fetchUserRoutines:", currentUsername);

        fetch(`https://fitness-tracker-backend.onrender.com/api/users/${currentUsername}/routines`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${ token }`
            },
          }).then(response => response.json())
            .then(result => {
              console.log("getUserRoutines:",result);
              setUserRoutines(result);
            })
            .catch(console.error);
        }
        useEffect(() => {
            getUserRoutines();
        },);
        const renderHelper = () => {
            console.log('render');
            if(!token){
                return <>
                <div className='mainBodyContainer'>
                    <h1 className='PageTitle'>My Routines</h1>
                    <h2>Log in or Sign Up To View Personal Routines</h2>
                    <div className="linkContainer">
                        <Link className="userControlsLoginLinkLeft" to='/signup'>Sign Up</Link>
                        <Link className="userControlsLoginLinkLeft" to='/login'>Log In</Link>
                    </div>
                </div>
                </>
            }else if (userRoutines[0]){
                return <>
                <div className='mainBodyContainer'>
                <h1 className="pageTitle">My Routines</h1>
                <Link to="/newroutine">Add a new Routine</Link>
                {userRoutines.map(routine => <div className="routinesContainer" key = {routine.id}>
                    <h2 className="routineTitle">{routine.name}</h2>
                    <div className="routineGoal" >Goal: {routine.goal}</div>
                    {(routine.isPublic) && <div className="routineInfoAndActivityDescription">Public routine</div>}
                    {(!routine.isPublic) && <div className="routineInfoAndActivityDescription">Private routine</div>}
                    <div className="editDeleteButtons">
                        <Link to='/updateroutine'> 
                            <button className="edit_add_buttons" type="button" onClick={()=> {
                                    setRoutineId(routine.id); 
                                    setRoutineName(routine.name); 
                                    setRoutineGoal(routine.goal);
                                }
                                }>Edit Routine
                            </button>
                        </Link>
                        <Link to='/addactivity'>
                            <button className="edit_add_buttons" type='button' onClick={()=> {setRoutineId(routine.id)}}>
                                Add Activities
                            </button>
                        </Link>
                        <button className="deleteButtons" type='button' onClick={()=> {handleDeleteRoutine(routine.id)}}>
                            Delete Routine
                        </button>
                    </div>
                    <h3 className="activitiesTitle">Activities:</h3>
                        <div>{routine.activities.map(activity => 
                            <div className='activitiesContainer' key={activity.routineActivityId}>
                                <h4 className="activityTitle">{activity.name}</h4>
                                <p className="activityInfo" >Description: {activity.description}</p>
                                <p className="activityInfo" >Duration: {activity.duration}</p>
                                <p className="activityInfo">Count: {activity.count}</p>
                                <div className="editDeleteButtons">
                                    <Link to='/updateroutineactivity'> 
                                        <button className="edit_add_buttons" type="button" onClick={()=> {
                                            setRoutineActivityId(activity.routineActivityId);                                    
                                            setRoutineActivityCount(activity.count);
                                            setRoutineActivityDuration(activity.duration)
                                        }}>
                                            Edit Activity
                                        </button>
                                    </Link>
                                    <button className="deleteButtons" type='button' onClick={()=> {
                                        console.log('activity:',activity);
                                        handleDeleteRoutineActivity(activity.routineActivityId)}}>
                                        Remove Activity
                                    </button>
                                </div>
                            </div>
                        )}
                        </div>
                    </div>
                  )}

                </div>
                </>
            }else {
                return <>
                <div className="mainBodyContainer">
                <h1>No Routines? Create One!</h1>
                <Link className="newRoutineLink" to="/newroutine">Add a new Routine</Link>
                </div>
                </>
            }
        }



    return (<div>{renderHelper()}</div>)
}
export default MyRoutines;