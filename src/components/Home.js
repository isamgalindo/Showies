import React from 'react';
import AddShow from "./AddShow";
import "../CSS-files/Home.css";
import { Suspense, useState, useEffect } from "react";
import {FormattedMessage} from 'react-intl';

const ShowList = React.lazy(() => import("./ShowList.js"));

const Home = (props) => {
    
    const {genres, shows, watching, setWatching, userLocale, user, loggedIn} = props;    

    const [watchingToken, setWatchingToken] = useState("");
    const [showPost, setShowPost] = useState({});

    const addShowToWatching = async (newShow) => {
        const updatedWatching = [newShow, ...watching];
        setWatching(updatedWatching);     
        await setShowPost(newShow); 
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
    }, []);

    //POST watching
    useEffect(() => {
        if (watchingToken !== "" && JSON.stringify(showPost) !== '{}') {
            const URL = `http://localhost:3000/api/v1/watching`;
            fetch(URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${watchingToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(showPost),
            })
            .then(setShowPost({}));
        }
    }, [showPost, watchingToken]);

    return (
        <div>    
            <h1 className="HO-welcome-message"> <FormattedMessage id="HO-welcome-message"/></h1>
            <h2 className="HO-explanation"> <FormattedMessage id="HO-explanation"/></h2>
            <AddShow shows={shows} addShowToWatching={addShowToWatching} user={user} watching={watching} loggedIn={loggedIn}/>
            <Suspense fallback={<div className="HO-lazy"> <FormattedMessage id="HO-lazy"/></div>}>
                <ShowList shows={shows} watching={watching} setWatching={setWatching} genres={genres} userLocale={userLocale}></ShowList>
            </Suspense>
        </div> 
    )
   
}

export default Home;