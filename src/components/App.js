import React from 'react';
import '../CSS-files/App.css';
import Header from './Header';
import Home from './Home';
import ShowDetails from './ShowDetails';
import Login from './Login';
import Logout from './Logout';
import { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './SignUp';
import { FormattedMessage } from 'react-intl';

const Contact = React.lazy(() => import("./Contact.js"));

function App(props) {

  const {userLocale, setUserLocale} = props; 

  const [genres, setGenres] = useState([]);
  const [shows, setShows] = useState([]);
  const [watching, setWatching] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  const [genreToken, setGenreToken] = useState("");
  const [showToken, setShowToken] = useState("");
  const [userToken, setUserToken] = useState("");

  //ApiUser genre login
  useEffect(() => {
    const requestBody = {
      username: 'genre_read',
      password: 'genre_read',
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
      .then(data => setGenreToken(data.token));
  }, []);

  //GET genres
  useEffect(()=>{
    if (genreToken !== ""){ 
      if (!navigator.onLine){
        if (localStorage.getItem("genres") === null) {
          setGenres([]);
        } else {
          setGenres(localStorage.getItem("genres"));
        }
      } else {
        const URL = "http://localhost:3000/api/v1/genres";
        fetch(URL, {
          headers: {
            'Authorization': `Bearer ${genreToken}`,
            'Content-Type': 'application/json',
          },
        }).then((data) => data.json())
        .then((data) => {
          setGenres(data);
          localStorage.setItem("genres", data);
        });
      }
    } 
  }, [genreToken]);

  //ApiUser show login
  useEffect(() => {
    const requestBody = {
      username: 'show_read',
      password: 'show_read',
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
      .then(data => setShowToken(data.token));
  }, []);

  //GET shows
  useEffect(()=>{
    if (showToken !== "") {
      if (!navigator.onLine){
        if (localStorage.getItem("shows") === null) {
          setShows([]);
        } else {
          setShows(localStorage.getItem("shows"));
        }
      } else {
        const URL = "http://localhost:3000/api/v1/shows";
        fetch(URL, {
          headers: {
            'Authorization': `Bearer ${showToken}`,
            'Content-Type': 'application/json',
          },
        }).then((data) => data.json())
        .then((data) => {
          setShows(data);
          localStorage.setItem("shows", data);
        });
      }
    }
  }, [showToken]);

  //ApiUser user login
  useEffect(() => {
    const requestBody = {
      username: 'user_read',
      password: 'user_read',
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

  //GET users
  useEffect(()=>{
    if (userToken !== "") {
      if (!navigator.onLine){
        if (localStorage.getItem("users") === null) {
          setUsers([]);
        } else {
          setUsers(localStorage.getItem("users"));
        }
      } else {
        const URL = "http://localhost:3000/api/v1/users";
        fetch(URL, {
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        }).then((data) => data.json())
        .then((data) => {
          setUsers(data);
          localStorage.setItem("users", data);
        });
      }
    }  
  }, [userToken]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header loggedIn={loggedIn} userLocale={userLocale} setUserLocale={setUserLocale}/>
        <Routes>
          <Route path="*" element={<Home genres={genres} shows={shows} watching={watching} setWatching={setWatching} user={user} userLocale={userLocale} loggedIn={loggedIn}/>} />
          <Route path="/contact" element={<Suspense fallback={<div className="C-lazy"><FormattedMessage id="App-contact-lazy"/></div>} ><Contact /></Suspense>} />
          <Route path="/show/:showId" element={<ShowDetails genres={genres} shows={shows} watching={watching} setWatching={setWatching} user={user} userLocale={userLocale}/>} />
          <Route path='/login' element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} users={users} setWatching={setWatching} userToken={userToken}/>} />
          <Route path='/user' element={<Logout loggedIn={loggedIn} user={user} setUser={setUser} setLoggedIn={setLoggedIn} setWatching={setWatching}/>} />
          <Route path='/signup' element={<SignUp loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} users={users} setUsers={setUsers} />}/>
        </Routes>  
      </BrowserRouter>
    </div>

  );
}


export default App;