import React, {  useEffect } from 'react';
import {Link} from 'react-router-dom';
const Routines = ({token, publicRoutines, setPublicRoutines, displayRoutines, setDisplayRoutines, searchTerm, setSearchTerm, routinesByActivityId, setRoutinesByActivityId}) => {
    console.log("displayRoutines:",displayRoutines);
    const getRoutines = () => {
        console.log("getRoutines called");
        fetch('https://fitness-tracker-backend.onrender.com/api/routines', {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response => response.json())
          .then(result => {
            console.log("result", result);
            setPublicRoutines(result);
            setDisplayRoutines(result);
          })
          .catch(console.error);
    }
    const postMatches = (routine, searchTerm) =>{
        if(routine.isPublic){
            if((searchTerm === "") && (routine.isPublic)){
            return routine
            }
            else if((routine.name.toLowerCase()).includes(searchTerm.toLowerCase())){
                return routine
            }
            else if((routine.goal.toLowerCase()).includes(searchTerm.toLowerCase())){
                return routine
            }
            else if((routine.creatorName.toLowerCase()).includes(searchTerm.toLowerCase())){
                return routine
            }}
        
    }
    const searchAndDisplay = (event) =>{
        if(event){
        event.preventDefault();
        }
        setDisplayRoutines(publicRoutines.filter(routine => postMatches(routine, searchTerm)))
    }
   useEffect(() => {
        getRoutines();
        searchAndDisplay();
        //searchUserOnclick()
    }, );
    const renderHelper = () => {
        if(routinesByActivityId[0]){
            console.log("routineByactId:",routinesByActivityId);
            console.log("searchTerm:", searchTerm);
        return <>
            <div className='mainBodyContainer' >
                <h1 className='routineTitle'>Public Routines Featuring:</h1>
                <h3>{searchTerm}</h3>
                {(token) && <h3>Head to My Routines to Create Your Own!</h3>}
                {(!token) && <h3>Log in or Sign Up To Create Your Own</h3>}
                <Link to='/activities' onClick={()=>{
                    setRoutinesByActivityId([]);
                    setSearchTerm('');
            }}>return to activities</Link>
                <Link to='/routines' onClick={()=>{
                    setRoutinesByActivityId([]);
                    setSearchTerm('');
                }}>show all public routines</Link>
                <form className='searchBarContainer' onSubmit={searchAndDisplay}>
                    <input type="text" className='searchBar' placeholder="Search" value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}></input>
                    <button type="submit" className="searchBarButtons">Search</button>
                    <button type="submit" className="searchBarButtons" onClick={()=>{
                    setSearchTerm('');
                    setDisplayRoutines(publicRoutines);
                    }}>Clear</button>
                </form>
                <div className='routineList'>
                    {routinesByActivityId.map(routines => <div className="routinesContainer" key = {routines.id}>
                        <h2 className='routineTitle' >{routines.name}</h2>
                        <div className='routineInfoAndActivityDescription' >Goal: {routines.goal}</div>
                            <h4 className="publicRoutinesActivitiesTitle">Activities</h4>
                            <div>{routines.activities.map(activity => 
                                <div className='activitiesContainer' key={activity.routineActivityId}>
                                    <h4 className="activityTitle">{activity.name}</h4>
                                    <p className="activityInfo">Description: {activity.description}</p>
                                    <p className="activityInfo">Duration: {activity.duration}</p>
                                    <p className="activityInfo">Count: {activity.count}</p>
                                </div>
                            )}</div>
                        </div>
                    )}
                </div>            
            </div> 
        </>
        }else if(displayRoutines[0]){
            console.log('displayRoutines:',displayRoutines);
            return<>
            
            <div className='mainBodyContainer' >
                <h1 className='routineTitle'>Public Routines</h1>
                {(token) && <h3>Head to My Routines to Create Your Own!</h3>}
                {(!token) && <h3>Log in or Sign Up To Create Your Own</h3>}
                <form className='searchBarContainer' onSubmit={searchAndDisplay}>
                    <input type="text" className='searchBar' placeholder="Search" value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}></input>
                    <button type="submit" className="searchBarButtons">Search</button>
                    <button type="submit" className="searchBarButtons" onClick={()=>{
                    setSearchTerm('');
                    setDisplayRoutines(publicRoutines);
                    }}>Clear</button>
                </form>
                <div className='routineList'>
                    {displayRoutines.map(routines => <div className="routinesContainer" key = {routines.id}>
                        <h2 className='routineTitle' >{routines.name}</h2>
                        <div className='routineInfoAndActivityDescription' >Goal: {routines.goal}</div>
                            <h3 className="publicRoutinesActivitiesTitle">Activities</h3>
                            <div>{routines.activities.map(activity => 
                                <div className='activitiesContainer' key={activity.routineActivityId}>
                                    <h4 className="activityTitle">{activity.name}</h4>
                                    <p className="activityInfo">Description: {activity.description}</p>
                                    <p className="activityInfo">Duration: {activity.duration}</p>
                                    <p className="activityInfo">Count: {activity.count}</p>
                                </div>
                            )}</div>
                        </div>
                    )}
                </div>            
            </div> 
            </>
        } else {
            <>
            <h4> nothing to see here</h4>
            </>
        }

    }
    
    return( <>
        <div>

            {renderHelper()}
        </div>

        </>
    );
}
export default Routines;