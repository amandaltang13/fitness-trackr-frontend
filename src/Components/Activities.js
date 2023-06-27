import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
const Activities = ({token, activities, setActivities, setActivityId, setActivityDescription, 
    setActivityName, searchTerm, setSearchTerm, setRoutinesByActivityId}) => {
    //const[searchTerm, setSearchTerm] = useState('');
    const[displayActivities, setDisplayActivities] = useState(activities);
    const getActivities = () => {
        console.log("getActivities called");
        console.log(token)
        fetch('https://fitness-tracker-backend.onrender.com/api/activities', {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response => response.json())
          .then(result => {
            console.log("activities result:", result);
            setActivities(result);
          })
          .catch(console.error);
    }
    const getRoutinesByActivityId = (activityId) => {
        console.log("getRoutinesByActivityID called");
        //console.log(token)
        fetch(`https://fitness-tracker-backend.onrender.com/api/activities/${activityId}/routines`, {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response => response.json())
          .then(result => {
            console.log("routines by activities result:", result);
            setRoutinesByActivityId(result);
          })
          .catch(console.error);
    }
    const postMatches = (activity, searchTerm) =>{
        if(searchTerm === ""){
            return activity
        }
        else if((activity.name.toLowerCase()).includes(searchTerm.toLowerCase())){
            return activity
        }
        else if((activity.description.toLowerCase()).includes(searchTerm.toLowerCase())){
            return activity
        }
        
    }

    const searchAndDisplay = (event) =>{
        if(event){
        event.preventDefault();
        }
        //console.log("event", event);
        setDisplayActivities(activities.filter(activity => postMatches(activity, searchTerm)))
    }

   useEffect(() => {
        getActivities();
        searchAndDisplay();
    },);
    
    const activitiesRenderHelper = () => {
        console.log("displayactivities:",displayActivities)
        if(displayActivities === []){
        return <>
            <div className="mainBodyContainer">
                    {(token) && <Link to='/newactivity'> Create New Activity</Link>}
                    {(!token) && <>
                        <h3>Log in or Sign Up To Create Your Own Activities</h3>
                    </>}
                    <div className='mainActivitiesContainer'>
                        <form className='searchBarContainer' onSubmit={searchAndDisplay}>
                        <input type="text" className='searchBar' placeholder="Search" value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}></input>
                        <button type="submit" className="searchBarButtons">Search</button>
                        <button type="submit" className="searchBarButtons" onClick={()=>{
                        setSearchTerm('');
                        setDisplayActivities(activities);
                        }}>Clear</button>
                        </form>
                        {activities.map(activity => 
                            <div className="activityContainer" key = {activity.id}>
                                <Link to='/routines' className='activitiesFromActivitiesTitle' onClick={()=>{
                                    getRoutinesByActivityId(activity.id);
                                    setSearchTerm(activity.name);
                                }} >{activity.name}</Link>
                                
                                <p>Description: {activity.description}</p> 
                                {(token) && <Link to='/updateActivity'> 
                                <button className="edit_add_buttons" type="button" onClick={()=> {
                                    setActivityId(activity.id); 
                                    setActivityName(activity.name); 
                                    setActivityDescription(activity.description)}}>
                                    Edit Description
                                </button>       
                                </Link>}          
                            </div>)
                        }   
                    </div>  
                </div>
            
            </>
        } else {
            return <>
                <div className="mainBodyContainer">
                    {(token) && <Link to='/newactivity'> Create New Activity</Link>}
                    {(!token) && <>
                        <h3>Log in or Sign Up To Create Your Own Activities</h3>
                    </>}
                    <div className='mainActivitiesContainer'>
                        <form className='searchBarContainer' onSubmit={searchAndDisplay}>
                        <input type="text" className='searchBar' placeholder="Search" value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}></input>
                        <button type="submit" className="searchBarButtons">Search</button>
                        <button type="submit" className="searchBarButtons" onClick={()=>{
                        setSearchTerm('');
                        setDisplayActivities(activities);
                        }}>Clear</button>
                        </form>
                        {activities.map(activity => 
                            <div className="activityContainer" key = {activity.id}>
                                <Link to='/routines'className='activitiesFromActivitiesTitle' onClick={()=>{
                                    getRoutinesByActivityId(activity.id);
                                    setSearchTerm(activity.name);
                                }}>{activity.name}</Link>
                                
                                <p>Description: {activity.description}</p> 
                                {(token) && <Link to='/updateActivity'> 
                                <button className="edit_add_buttons" type="button" onClick={()=> {
                                    setActivityId(activity.id); 
                                    setActivityName(activity.name); 
                                    setActivityDescription(activity.description)}}>
                                    Edit Description
                                </button>       
                                </Link>}          
                            </div>)
                        }   
                    </div>  
                </div>
            </>
        }
    }

    return(<>
        
        <div className='mainBodyContainer'>
            <h1 className='pageTitle'>Activities</h1>
            </div>
        <div>  
            {activitiesRenderHelper()}
            </div>
        </>
    );
}
export default Activities;