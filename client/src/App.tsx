// import React from 'react';
import React, { useEffect, useState } from 'react';

import './App.css';
import {BrowserRouter, Switch} from 'react-router-dom';
import UserRegistrationForm from './api/userApi/components/modalWindows/userRegistrationForm/UserRegistrationForm'
import UserLoginForm from './api/userApi/components/modalWindows/loginForm/loginForm';
import AppRouter from './api/routePage/AppRouter';

import Header from './api/userApi/components/header/header';
import { getToken } from './api/userApi/getToken';
import { useDispatch } from 'react-redux';

function App() {
  const [logForm, setLogForm] = useState(false);
  const [regForm, setRegForm] = useState(false);

  const dispatch:any = useDispatch<any>();

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

  // const user = {
  //   login: '',
  //   email: '',
  //   password: '',
  //   name: '',
  //   surname: '',
  //   dob: ''
  // }


  useEffect(() => {
    dispatch(getToken());
    }, [dispatch, getToken])

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
