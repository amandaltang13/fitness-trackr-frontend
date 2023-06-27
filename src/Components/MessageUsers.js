import { useNavigate } from "react-router-dom";
function MessageUser ({ userMessage, successStatus }) {
  let navigate = useNavigate();

  if (successStatus){
    setTimeout(() => navigate("/myroutines"), 3000);
  } else {
    setTimeout(() => navigate(-1), 3000);
  }
  
  return (
    <div className="logIn_signUp_create_edit_container">
        {(!successStatus) && <h1 className="pageTitle">Oh no...</h1>}
        {(successStatus) && <h1 className="pageTitle">Success!!</h1>}
        <p className="pageMessage">{userMessage}</p>
    </div>
  );
}

export default MessageUser;