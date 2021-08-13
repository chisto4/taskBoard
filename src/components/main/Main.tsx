import React, { useState } from 'react';
import './mainStyle.css';

import UserRegistrationForm from '../userRegistrationForm/UserRegistrationForm';
import UserLoginForm from '../loginForm/loginForm';
import Header from '../header/header';

function Main () {
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
<main>
<Header onClickLog={onClickLog}
  onClickReg={onClickReg}
/>
{regForm && <UserRegistrationForm
    onClickReg={onClickReg}
/>}
{logForm && <UserLoginForm
    onClickLog={onClickLog}
/>}
</main>
    );
}

export default Main;
