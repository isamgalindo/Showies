import React from "react";
import "../CSS-files/User.css";
import { useState, useEffect } from "react";
import { FormattedMessage } from 'react-intl';
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { Form } from "react-bootstrap";

const SignUp = (props) => {
  
  const { loggedIn, setLoggedIn, setUser, users, setUsers } = props;  

  const nav = useNavigate();

  const [userToken, setUserToken] = useState("");
  const [newUser, setNewUser] = useState({});

  const[formValues, setFormValues] = useState({name:"", email: "", password:"", passwordConf: ""});
  const[validationStates, setValidationStates] = useState({email: true, password: true, passwordConf: true});

  const [showPasswords, setShowPasswords] = useState(false);

  const emailValidation = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,}|[a-zA-Z]{2,}\.[a-zA-Z]{2,})$/;
  const passValidation = /^.{8,}$/;

  const intl = useIntl();
  const SU_already_signed_in= intl.formatMessage({ id: "SU-already-signed-in" });
  const SU_mandatory = intl.formatMessage({ id: "SU-mandatory-fields-alert" });
  const SU_created = intl.formatMessage({ id: "SU-user-created" });
  const SU_mail_placeholder = intl.formatMessage({ id: "SU-mail-placeholder" });
  const SU_password_placeholder = intl.formatMessage({ id: "SU-password-placeholder" });
  const SU_password_confirm_placeholder = intl.formatMessage({ id: "SU-password-confirm-placeholder" });
  const SU_email_fail = intl.formatMessage({ id: "SU-email-fail" });
   
  const handleNameChange = ((e) => {
    setFormValues({...formValues, name: e.target.value})
  });

  const handleEmailChange = ((e) => {
    const validEmail = emailValidation.test(e.target.value);
    setValidationStates({ ...validationStates, email: validEmail }); 
    setFormValues({...formValues, email: e.target.value})
  });

  const handlePasswordChange = ((e) => {
    const validPassword = passValidation.test(e.target.value);
    setFormValues({...formValues, password: e.target.value});
    const validPasswordConf = formValues.passwordConf === e.target.value;
    setValidationStates({ ...validationStates, password: validPassword, passwordConf: validPasswordConf });
  });

  const handlePasswordConfChange = ((e) => {
    const validPasswordConf = e.target.value === formValues.password;
    setValidationStates({ ...validationStates, passwordConf: validPasswordConf });
    setFormValues({...formValues, passwordConf: e.target.value});
  });

  const handleClick = async () => {
    if(loggedIn) {
      alert(SU_already_signed_in);
      return;
    }

    if (formValues.name.trim() === "" || formValues.email.trim() === "" || formValues.password.trim() === "" || formValues.passwordConf.trim() === "") {
      alert(SU_mandatory);
      return;
    }

    if (Object.values(validationStates).some(state => state === false)) {
      return;
    }

    const validateUser = users.find(u => u.email === formValues.email);
        
    if (validateUser === undefined){
      await setNewUser({
        name: formValues.name,
        email: formValues.email,
        password: formValues.password
      });
      
      setLoggedIn(true);
      alert(SU_created);
      nav('/');
    }
    else {
      alert(SU_email_fail);
    }

  };

  //ApiUser user login
  useEffect(() => {
    const requestBody = {
      username: 'user_write',
      password: 'user_write',
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
      .then(data => setUserToken(data.token));
  }, []);

  //POST user
  useEffect(() => {
    if (userToken !== "" && JSON.stringify(newUser) !== '{}') {
        const URL = `http://localhost:3000/api/v1/users`;
        fetch(URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
        })
        .then(response => response.json())
        .then(data => {
          const updatedUsers = [...users, data];
          setUser(data);
          setUsers(updatedUsers);
        })
        .then(setNewUser({}));
    }
  }, [newUser, setUser, setUsers, userToken, users]);

  return (
    <div className="USR-container" data-testid="signUp-container">
      
      <h3 className="USR-welcome-message"> <FormattedMessage id="SU-welcome-message"/> </h3>

      <Form style={{width: "50vmin", marginTop: "5vmin"}}>
        
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control style={{ width: '100%' }} type="text" placeholder={intl.formatMessage({id:"SU-name-placeholder"})} onChange={handleNameChange} value={formValues.name} />
        </Form.Group>

        <Form.Group className="mb-6" controlId="formBasicEmail">
            <Form.Control style={{ width: '100%' }} type="email" placeholder={SU_mail_placeholder} onChange={handleEmailChange} value={formValues.email} 
            className={validationStates.email ? null : 'USR-invalid-input'}/>
            { !validationStates.email && <Form.Text className="text-muted" style={{fontWeight:"normal"}}> <FormattedMessage id="SU-email-warning"/> </Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword" style={{marginTop:"2vmin"}}>
            <Form.Control style={{ width: '100%' }} type={showPasswords ? "text" : "password"} placeholder={SU_password_placeholder} onChange={handlePasswordChange} value={formValues.password} 
            className={validationStates.password ? null : 'USR-invalid-input'}/>
            { !validationStates.password && <Form.Text className="text-muted" style={{fontWeight:"normal"}}> <FormattedMessage id="SU-password-warning"/> </Form.Text> }
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicPasswordConfirm" style={{marginTop:"2vmin"}}>
            <Form.Control style={{ width: '100%' }} type={showPasswords ? "text" : "password"} placeholder={SU_password_confirm_placeholder} onChange={handlePasswordConfChange} value={formValues.passwordConf} 
            className={validationStates.passwordConf ? null : 'USR-invalid-input'}/>
            { !validationStates.passwordConf && <Form.Text className="text-muted" style={{fontWeight:"normal"}}> <FormattedMessage id="SU-password-conf-warning"/> </Form.Text> }
        </Form.Group>

        <Form.Check checked={showPasswords} onChange={() => setShowPasswords(!showPasswords)} 
          label={intl.formatMessage({id:"SU-show-passwords"})} style={{fontWeight:"normal"}}></Form.Check>

        <h3 className="USR-mandatory-fields"> <FormattedMessage id="SU-mandatory-fields"/> </h3>
        
      </Form>

      

      <button style={{marginTop:"2vmin"}} className="USR-button" onClick={handleClick}>
          <FormattedMessage id="SU-create"/>
      </button>

    </div>
  );
};

export default SignUp;
