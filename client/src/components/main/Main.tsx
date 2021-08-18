import React, { useState } from 'react';
import './mainStyle.css';

import UserRegistrationForm from '../modalWindows/userRegistrationForm/UserRegistrationForm';
import UserLoginForm from '../modalWindows/loginForm/loginForm';
import Header from '../header/header';
import WorkSpace from '../pages/workSpace/WorkSpace'

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
{/* <WorkSpace/> */}
</main>
    );
}

export default Main;
