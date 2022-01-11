import React, { useState, useEffect } from "react";
import Routes from './routes-nav/Routes'
import BoonelistApi from './api/api'
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import jwt from 'jsonwebtoken'
import Navigation from './routes-nav/Navigation'
import UserContext from './auth/UserContext'
import './App.css';
import LoadingSpinner from "./common/LoadingSpinner";

export const TOKEN_STORAGE_ID = "boonelist-token"

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID)
  const [currentUser, setCurrentUser] = useState(null)

  // Loads user info from the API. This should not run until user is logged in and assigned a token.
  // Should re-rerun upon logout; the token value is a dependency for this effect.

  useEffect(function loadUserInfo() {

    async function getCurrentUser(){
      if(token){
        try {
          let { username } = jwt.decode(token);
          // Store token on API class so it can be used to call
          BoonelistApi.token = token;
          let currentUser = await BoonelistApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch(err) {
          console.error("App loadUserInfo: problem loading", err)
        }
      }
      setInfoLoaded(true);
    }

    // Set infoLoaded to false while async getCurrentUser runs
    // Once data is loaded (or error), this will be set back to false
    // Regulates the loading spinner
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  // Sign user up with data and log them in (set token)
  async function signup(signupData){
    try {
      let token = await BoonelistApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch(errors) {
      console.error("Error occurred during signup", errors);
      return { success: false, errors }
    }
  }

  async function login(loginData){
    try{
      let token = await BoonelistApi.login(loginData);
      setToken(token);
      return { success: true }
    } catch(errors){
      console.error("Error occurred during login", errors);
      return { success: false, errors}
    }
  }

  // Handles site-wide logout.
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  if(!infoLoaded) return <LoadingSpinner />

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser }}>
        <div className="App">
          <Navigation logout={logout}/>
          <Routes login={login} signup={signup}/>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
);
}

export default App;
