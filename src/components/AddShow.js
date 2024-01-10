import '../CSS-files/AddShow.css';
import { useState } from "react";
// import {AiOutlineCloseCircle} from 'react-icons/ai';
import {ImPlus} from 'react-icons/im';
import { FormattedMessage } from 'react-intl';
import { useIntl } from "react-intl";
import Select from 'react-select';

const AddShow = (props) => {

  const {shows, loggedIn, user, watching, addShowToWatching } = props;
  
  const [season, setSeason] = useState("");
  const [episode, setEpisode] = useState("");
  const [lastSeen, setLastSeen] = useState(new Date());

  const [show, setShow] = useState("");

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const intl = useIntl();
  const AS_season_placeholder = intl.formatMessage({ id: "AS-season-placeholder" });
  const AS_episode_placeholder = intl.formatMessage({ id: "AS-episode-placeholder" });
  const AS_mandatory_fields_alert = intl.formatMessage({ id: "AS-mandatory-fields-alert" });
  const AS_season_episode_alert = intl.formatMessage({ id: "AS-season-episode-alert" });
  const AS_logged_in = intl.formatMessage({ id: "AS-logged-in" });
  const AS_name_placeholder = intl.formatMessage({ id: "AS-name-placeholder" });
  const AS_already_watching = intl.formatMessage({ id: "AS-already-watching" });

  const options = shows.map((eachShow) => ({
    value: eachShow.id,
    label: eachShow.name,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "35vmin",
      height: "5vmin",
      textAlign: "left",
      fontSize: "2vmin",
      backgroundColor: "#e8e8e8",
      color: "#707070",
      border: "none"
    }),
    option: (provided) => ({
      ...provided,
      textAlign: "left",
      fontSize: "2vmin",
    })
  };
    
  const handleClick = () => {
      if (loggedIn === false) {
        alert(AS_logged_in)
      } 
      else {
        setIsPopupOpen(true);
      } 
  };

  const handleShowChange = (selected) => {
    setShow(selected);
  };

  const handleInputChange = (setInput, event) => {
      setInput(event.target.value);
  };

  const handleInputReset = (s, e, d,) => {
    setShow("");
    setSeason(s); setEpisode(e); setLastSeen(d);
  }

  const handleAddShow = async () => {
    
    if (show === "" || season.trim() === "" || episode.trim() === "") {
      alert(AS_mandatory_fields_alert);
      return;
    }
    else if (isNaN(season) || isNaN(episode) || season < 0 || episode < 0) {
      alert(AS_season_episode_alert);
    }
    else {
      const validateWatching = watching.find(w => w.showId === show.value);
      if (validateWatching === undefined){
        setIsPopupOpen(false);
        const newShow = {
          showId: show.value,
          userId: user.id,
          season: Number(season),
          episode: Number(episode),
          lastSeen: lastSeen.toLocaleDateString(),
        }
        await addShowToWatching(newShow);
      }
      else {
        alert(AS_already_watching);
      }
      handleInputReset("", "", new Date());
    }  
  }
      
  const handleCancel = () => {
    setIsPopupOpen(false);
    handleInputReset("", "", new Date());
  }  

  const handleKeyPressCancel = (e) => {
    if (e.key === 'Enter') {
      handleCancel();
    }
  }

  return (
    <div className="AS-container"> 
      <button data-testid="add-show-home" className="AS-button" onClick={handleClick}><FormattedMessage id="AS-button"/> <ImPlus className="AS-plus" /></button>
      
      {isPopupOpen && <div className="AS-dim"></div>}

      {isPopupOpen && (
        <div className="AS-popup">
          <header className="AS-header"> 
            <div className="AS-title"><FormattedMessage id="AS-header"/></div>
            {/*<div className="AS-exit" onClick={() => setIsPopupOpen(false)}><AiOutlineCloseCircle/></div>*/}
          </header>
          <div className="AS-content">
            <ul>
              <Select
                  id="name"
                  styles={customStyles}
                  options={options}
                  onChange={handleShowChange}
                  isSearchable={true}
                  placeholder={AS_name_placeholder}
                  value={show}
                  maxMenuHeight={200} >
              </Select>
            </ul>
            <ul>
              <input type="number"
              data-testid="show-season" 
              id="season"
              placeholder={AS_season_placeholder} 
              className="AS-popup-input"
              value={season}
              onChange={(event) => handleInputChange(setSeason, event)}></input>
            </ul>
            <ul>
              <input type="number" 
              data-testid="show-episode"
              id="episode"
              placeholder={AS_episode_placeholder} 
              className="AS-popup-input"
              value={episode}
              onChange={(event) => handleInputChange(setEpisode, event)}></input>
            </ul>
            <p className="AS-mandatory-fields" style={{alignSelf: "flex-start"}}><FormattedMessage id="AS-mandatory-fields"/></p>
            <div className="AS-add-cancel">
              <button data-testid="add-show" className="AS-add" onClick={handleAddShow}><FormattedMessage id="AS-add"/></button>
              <button className="AS-cancel" tabIndex="0" onClick={handleCancel} onKeyPress={handleKeyPressCancel}><FormattedMessage id="AS-cancel"/></button>    
            </div>   
          </div>
        </div>
      )}
    </div>
  );
}

export default AddShow;