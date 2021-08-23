// import React from 'react';
import React, { useState } from 'react';

import './App.css';
import {BrowserRouter, Switch} from 'react-router-dom';
import UserRegistrationForm from './components/modalWindows/userRegistrationForm/UserRegistrationForm'
import UserLoginForm from './components/modalWindows/loginForm/loginForm';
import AppRouter from './components/api/routePage/AppRouter';

import Header from './components/header/header';

function App() {
  const [logForm, setLogForm] = useState(false);
  const [regForm, setRegForm] = useState(false);
  const onClickLog = () => {
    setLogForm(!logForm);
    if(regForm){
      setRegForm(!regForm);
    }
  }
  const onClickReg = () => {
    setRegForm(!regForm);
    if(logForm){
      setLogForm(!logForm);
    }
  }
  return (
    <BrowserRouter>
      <div className="App">
      <Header onClickLog={onClickLog}
  onClickReg={onClickReg}
/>
{regForm && <UserRegistrationForm
    onClickReg={onClickReg}
/>}
{logForm && <UserLoginForm
    onClickLog={onClickLog}
/>}          
          <AppRouter/>\

          <Switch>
            {/* <Route path="registration" component={UserRegistrationForm}/> */}
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
