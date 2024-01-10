import React from "react";
import "../CSS-files/Logout.css";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";

const Logout = (props) => {

    const { loggedIn, setLoggedIn, user, setUser, setWatching } = props;

    const nav = useNavigate();

    const intl = useIntl();
    const L_logout = intl.formatMessage({ id: "LO-button" });
    const L_please_login = intl.formatMessage({ id: "LO-please-login" });
    const L_confirm = intl.formatMessage({ id: "LO-confirm" });

    const handleClick = () => {

        const confirmed = window.confirm(L_confirm);
        if (confirmed) {
            nav('/login');
            setUser({});
            setLoggedIn(false);
            setWatching([]);
        }
    }

    return (
        <div style={{textAlign: "center"}}>
            {loggedIn && <div> 
                <img src="/UsrLogin.png" alt="UserLogin" style={{height:"30vmin", marginTop:"7vmin"}} ></img>
                <h2 className="mt-3" style={{fontWeight: "inherit"}}>{user.name}</h2>
                <button className="LO-button" onClick={handleClick}> {L_logout} </button>
            </div>}
            {!loggedIn && <h2 style={{marginTop: "10vmin"}}>{L_please_login}</h2>}
        </div>
    )

}

export default Logout;