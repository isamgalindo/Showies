import React from "react";
import "../CSS-files/User.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { Form } from "react-bootstrap";

const Login = (props) => {

  const { loggedIn, setLoggedIn, setUser, users, setWatching } = props;
  
  const nav = useNavigate();

  const [formValues, setFormValues] = useState({email: "", password:""});
  const [showPassword, setShowPassword] = useState(false);

  const [userWatchingToken, setUserWatchingToken] = useState("");
  const [userId, setUserId] = useState("");

  const handleEmailChange = ((e) => {
    setFormValues({...formValues, email: e.target.value})
  });

  const handlePasswordChange = ((e) => {
    setFormValues({...formValues, password: e.target.value});
  });

  const intl = useIntl();
  const L_login = intl.formatMessage({ id: "L-login" });
  const L_header = intl.formatMessage({ id: "L-header" });
  const L_mail_placeholder = intl.formatMessage({ id: "L-mail-placeholder" });
  const L_passeword_placeholder = intl.formatMessage({ id: "L-password-placeholder"});
  const L_non_user = intl.formatMessage({ id: "L-non-user" });
  const L_already_signed_in = intl.formatMessage({ id: "SU-already-signed-in" });
  const L_mandatory = intl.formatMessage({ id: "SU-mandatory-fields-alert" });

  const handleClick = async () => {
    if (loggedIn) {
      alert(L_already_signed_in);
      return;
    }
    if (formValues.email.trim() === "" || formValues.password.trim() === "") {
      alert(L_mandatory);
      return;
    }

    const validateUser = users.find((u) => u.email === formValues.email);
    
    if (validateUser !== undefined && validateUser.password === formValues.password) {
      await setUserId(validateUser.id);
      setLoggedIn(true);
      setUser(validateUser);
      nav('/');
    }
    else {
      alert(intl.formatMessage({id:"L-invalid-email-password"}));
    }
  };

  //ApiUser user-watching login
  useEffect(() => {
    const requestBody = {
      username: 'user_watching_read',
      password: 'user_watching_read',
    };
    const URL = 'http://localhost:3000/api/v1/apiUsers/login';
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.json())
      .then(data => setUserWatchingToken(data.token));
  }, []);

  //GET user-watching
  useEffect(()=>{
    if (userWatchingToken !== "" && userId !== "") {
      if (!navigator.onLine){
        if (localStorage.getItem("user-watching") === null) {
          setWatching([]);
        } else {
          setWatching(localStorage.getItem("user-watching"));
        }
      } else {
        const URL = `http://localhost:3000/api/v1/users/${userId}/watching`;
        fetch(URL, {
          headers: {
            'Authorization': `Bearer ${userWatchingToken}`,
            'Content-Type': 'application/json',
          },
        }).then((data) => data.json())
        .then((data) => {
          setWatching(data);
          localStorage.setItem("user-watching", data);
        });
      }
    }  
  }, [userId, setWatching, userWatchingToken]);

  return (
    <div className="USR-container" data-testid="login-container" >

      <h3 className="USR-welcome-message"> {L_header} </h3>
      
      <Form style={{width: "50vmin", marginTop: "5vmin"}} >
       
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control style={{ width: '100%' }} type="email" placeholder={L_mail_placeholder} onChange={handleEmailChange} value={formValues.email} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword" style={{marginTop:"2vmin"}}>
            <Form.Control style={{ width: '100%' }} type={showPassword ? "text" : "password"} placeholder={L_passeword_placeholder} onChange={handlePasswordChange} value={formValues.password} />
        </Form.Group>
        
        <Form.Check checked={showPassword} onChange={() => setShowPassword(!showPassword)} 
            label={intl.formatMessage({id:"L-show-password"})} style={{marginTop:"0.5vmin", fontWeight:"normal"}}></Form.Check>
      
      </Form>

      <button className="USR-button" onClick={handleClick} style={{marginTop: "3vmin"}}> {L_login} </button>

      <span>
        <Link to="/signup" className="USR-signUp">
          <h3 style={{fontSize:"3vmin", marginTop:"6vmin"}}>{L_non_user} </h3>
        </Link>
      </span>
      
    </div>
  );
};

export default Login;
