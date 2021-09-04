import React, { useEffect, useState } from 'react';

import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import UserRegistrationForm from './pages/components/modalWindows/userRegistrationForm/UserRegistrationForm'
import UserLoginForm from './pages/components/modalWindows/loginForm/loginForm';
import AppRouter from './api/routePage/AppRouter';

import Header from './pages/components/header/header';
import { useDispatch } from 'react-redux';
import { updateUserInformationToken } from './store/userReducer/userThunk';
import { useAppSelector } from './store/reducers';
// import { useAppSelector } from './store/reducers';

function App() {
  const [logForm, setLogForm] = useState(false);
  const [regForm, setRegForm] = useState(false);
  // const urlParams = useHistory();

  // useEffect(() => getUsersByPage(urlParams), [urlParams])

  const dispatch = useDispatch();

  const isAuth = useAppSelector((state) => state.user.auth)

  const onClickLog = () => {
    setLogForm(!logForm);
    if (regForm) {
      setRegForm(!regForm);
    }
  }
  const onClickReg = () => {
    setRegForm(!regForm);
    if (logForm) {
      setLogForm(!logForm);
    }
  }

  useEffect(() => {
    dispatch(updateUserInformationToken());
  }, [])

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
        <AppRouter />\

        <Switch>
          {/* <Route path="registration" component={UserRegistrationForm}/> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
