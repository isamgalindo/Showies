import '../CSS-files/Header.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useIntl } from "react-intl";
import LanguageSelector from './LanguageSelector';

const Header = (props) => {

  const nav = useNavigate();

  const {loggedIn, userLocale,setUserLocale } = props;    

    const intl = useIntl();
    const HE_wip = intl.formatMessage({ id: "HE-wip" });
    const handleFAQs = () => {alert(HE_wip)}

    const handleKeyPressHome = (e) => {
      if (e.key === 'Enter') {
        nav('/');;
      }
    }

    const handleKeyPressFAQs = (e) => {
      if (e.key === 'Enter') {
        alert(HE_wip);
      }
    }

    return(
        <header className="HE-header">
          <Link to="/" className="HE-logoName">
            <img className="HE-logo" src="/logo.png" alt="logo" tabIndex="0" onKeyPress={handleKeyPressHome}></img>
            <div className="HE-name" tabIndex="0" onKeyPress={handleKeyPressHome}> SHOWIES </div> 
          </Link>
          <div className="HE-right">
            <div className="HE-contactFAQs">
              <Link to="/contact" className="HE-contact"><FormattedMessage id="HE-contact"/></Link>
              <div className="HE-separator">|</div>
              <div className="HE-FAQs" tabIndex="0" onClick={handleFAQs} onKeyPress={handleKeyPressFAQs}><FormattedMessage id="HE-FAQs"/></div>
            </div> 
            {loggedIn && <Link to="/user"><img className="HE-login" src="/UsrLogin.png" alt="UserLogin" tabIndex="0"></img></Link>}   
            {!loggedIn && <Link to="/login" className="HE-UserLogin">
              <img className="HE-login" src="/userLog.png" alt="UserLogin" tabIndex="0"></img>
              </Link>}
          <div className="HE-language-selector"><LanguageSelector userLocale = {userLocale} setUserLocale = {setUserLocale}/></div>
          </div>
      </header>
    )
}

export default Header;