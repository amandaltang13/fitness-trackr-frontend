import React from "react";
import { Link, useNavigate } from 'react-router-dom';
function Header({currentUsername, setCurrentUsername, setToken}) {
   
    let navigate = useNavigate();
    setCurrentUsername(window.localStorage.getItem("username"))
    setToken(window.localStorage.getItem("token"))

    const handleSubmit = (event) => {
        event.preventDefault();
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("username")
        setCurrentUsername(window.localStorage.getItem("username"));
        navigate("/");
    }
    
  return (
    <div className="header">
        <div className="headerTop">
            <div className="headerAboutContainer">
                <h1 className="aboutTitle">Fitness Trac.kr</h1>
                <h5 className="aboutSlogan"> Get your Routine on!! </h5>
            </div>        
        </div>
        <div className="headerLinksContainer">
            <nav className="headerNavBarContainer">
                <Link className="navBarLink" to="/">Home  |</Link>
                <Link className="navBarLink" to="/routines">Public Routines |</Link>
                <Link className="navBarLink" to="/activities">Activities</Link>
                {(currentUsername) && <Link className="navBarLink" to="/myroutines">| My Routines </Link>}
            </nav>
            {(currentUsername) &&
            <nav className="headerUserControlsContainer">
                <p className="userControlsWelcome">Welcome {currentUsername}!</p>
                <button className="userControlsLoginLinkScrollBar" onClick={handleSubmit} >Log Out</button>
            </nav>}
            {(!currentUsername) &&
            <nav className="headerUserControlsContainer">
                <p className="userControlsWelcome">Welcome! </p>
                <Link className="userControlsLoginLinkLeft" to="/login">Log In</Link>
                <Link className="userControlsLoginLinkRight" to="/signup">Sign Up</Link>
            </nav>}                   
        </div>
    </div>
  );
}
export default Header;