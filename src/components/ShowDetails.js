import React from 'react';
import '../CSS-files/ShowDetails.css'
import DeleteButton from './DeleteButton'
import { useParams } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import {ImMinus, ImPlus} from 'react-icons/im';
import { FormattedMessage, useIntl } from 'react-intl';
const ShowList = React.lazy(() => import("./ShowList.js"));

const ShowDetails = (props) => {

    const params = useParams();
    const { genres, shows, watching, setWatching, userLocale } = props;

    const selectedShow = watching.find((w) => w.showId === params.showId);

    const [watchingToken, setWatchingToken] = useState("");
    const [showPut, setShowPut] = useState({});

    const intl = useIntl();
    const SD_poster_alt = intl.formatMessage({ id: "SD-poster-alt" });

    const handleMinusSeason = async () => {
        const s = Number(selectedShow.season);
        if (s > 0){
            const watchingCopy = [...watching];
            const index = watchingCopy.findIndex((w) => w.showId === selectedShow.showId && w.userId === selectedShow.userId);
            watchingCopy.splice(index, 1);
            const d = new Date();
            const updatedShow = {
                userId: selectedShow.userId,
                showId: selectedShow.showId,
                season: s-1,
                episode: 1,
                lastSeen: d.toLocaleDateString(),
            }
            const updatedWatching = [updatedShow, ...watchingCopy];
            setWatching(updatedWatching);
            await setShowPut(updatedShow);
        }    
    };

    const handlePlusSeason = async () => {
        const s = Number(selectedShow.season);
        const watchingCopy = [...watching];
        const index = watchingCopy.findIndex((w) => w.showId === selectedShow.showId && w.userId === selectedShow.userId);
        watchingCopy.splice(index, 1);
        const d = new Date();
        const updatedShow = {
            userId: selectedShow.userId,
            showId: selectedShow.showId,
            season: s+1,
            episode: 1,
            lastSeen: d.toLocaleDateString(),
        };
        const updatedWatching = [updatedShow, ...watchingCopy];
        setWatching(updatedWatching);
        await setShowPut(updatedShow);
    };

    const handleMinusEpisode = async () => {
        const e = Number(selectedShow.episode);
        if (e > 0){
            const watchingCopy = [...watching];
            const index = watchingCopy.findIndex((w) => w.showId === selectedShow.showId && w.userId === selectedShow.userId);
            watchingCopy.splice(index, 1);
            const d = new Date();
            const updatedShow = {
                userId: selectedShow.userId,
                showId: selectedShow.showId,
                season: selectedShow.season,
                episode: e-1,
                lastSeen: d.toLocaleDateString(),
            }
            const updatedWatching = [updatedShow, ...watchingCopy];
            setWatching(updatedWatching);
            await setShowPut(updatedShow);
        }   
    };

    const handlePlusEpisode = async () => {
        const e = Number(selectedShow.episode);
        const watchingCopy = [...watching];
        const index = watchingCopy.findIndex((w) => w.showId === selectedShow.showId && w.userId === selectedShow.userId);
        watchingCopy.splice(index, 1);
        const d = new Date();
        const updatedShow = {
            userId: selectedShow.userId,
            showId: selectedShow.showId,
            season: selectedShow.season,
            episode: e+1,
            lastSeen: d.toLocaleDateString(),
        }
        const updatedWatching = [updatedShow, ...watchingCopy];
        setWatching(updatedWatching);
        await setShowPut(updatedShow);
    };

    const handleKeyPress = (setProgress, e) => {
        if (e.key === 'Enter'){
            setProgress(e.target.value);
        } 
    };

    //ApiUser watching login
    useEffect(() => {

        const requestBody = {
        username: 'watching_write',
        password: 'watching_write',
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
        .then(data => setWatchingToken(data.token));
        
    }, [watchingToken]);

    //PUT watching
    useEffect(() => {
        if (watchingToken !== "" && JSON.stringify(showPut) !== '{}') {
            const URL = `http://localhost:3000/api/v1/watching/${selectedShow.userId}/${selectedShow.showId}`;
            fetch(URL, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${watchingToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(showPut),
            })
            .then(setShowPut({}));
        }
        
    }, [selectedShow.showId, selectedShow.userId, showPut, watchingToken]);

    return(
        <div>
            <div className="SD-show-details">
                <div><img className="SD-poster" src={shows.find((s) => s.id === selectedShow.showId).poster} alt={SD_poster_alt}></img></div>
                <div className="SD-info">
                    <h1 className="SD-name">{shows.find((s) => s.id === selectedShow.showId).name}</h1>
                    <div className="SD-details">
                        <div><FormattedMessage id="SD-season"/> 
                            <span data-testid="season-value" style={{ color: 'black', marginLeft: '1vmin' }}>{selectedShow.season}</span> 
                            <ImPlus data-testid="plus-season" className="SD-plus" onClick={handlePlusSeason} tabIndex="0" onKeyPress={(e) => handleKeyPress(handlePlusSeason, e)}/> 
                            <ImMinus data-testid="minus-season" className="SD-minus" onClick={handleMinusSeason} tabIndex="0" onKeyPress={(e) => handleKeyPress(handleMinusSeason, e)}/> 
                        </div>
                        <div><FormattedMessage id="SD-episode"/>  
                            <span data-testid="episode-value" style={{ color: 'black', marginLeft: '1vmin' }}>{selectedShow.episode}</span> 
                            <ImPlus data-testid="plus-episode" className="SD-plus" onClick={handlePlusEpisode} tabIndex="0" onKeyPress={(e) => handleKeyPress(handlePlusEpisode, e)}/> 
                            <ImMinus data-testid="minus-episode" className="SD-minus" onClick={handleMinusEpisode} tabIndex="0" onKeyPress={(e) => handleKeyPress(handleMinusEpisode, e)}/> 
                        </div>
                        <div><FormattedMessage id="SD-genres"/> 
                            <span style={{ color: 'black' }}>
                                {' '+shows.find((s) => s.id === selectedShow.showId).genres.map(genre => genre['name'+userLocale.toUpperCase()]).join(', ')}
                            </span>
                        </div>
                        <div><FormattedMessage id="SD-last-seen"/> <span style={{ color: 'black' }}>{selectedShow.lastSeen}</span></div>
                        <div className="SD-delete">
                                <DeleteButton watching={watching} setWatching={setWatching} userId={selectedShow.userId} showId={selectedShow.showId} />
                        </div>
                    </div>
                </div>
            </div>
            <Suspense fallback={<div className="SD-lazy"> <FormattedMessage id="SD-lazy"/></div>}>
                <ShowList 
                    genres={genres}
                    shows={shows}
                    watching={watching}
                    setWatching={setWatching}
                    userLocale={userLocale}/>
            </Suspense>
        </div>
        
    )
}

export default ShowDetails;
