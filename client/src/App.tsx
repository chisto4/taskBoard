import React, { useEffect, useState } from 'react';

import './App.css';
import { BrowserRouter, Switch, Route, useLocation, useHistory } from 'react-router-dom';
import UserRegistrationForm from './pages/components/modalWindows/userRegistrationForm/UserRegistrationForm'
import UserLoginForm from './pages/components/modalWindows/loginForm/loginForm';

import Header from './pages/components/header/header';
import { useDispatch } from 'react-redux';
import { updateUserInformationToken } from './store/userReducer/userThunk';
import PrivateRoute from './api/routePage/PrivateRouter';
import WorkSpace from './pages/workSpace/WorkSpace';
import BoardSpace from './pages/boardspace/boardSpace';
import UserPage from './pages/userPage/userPage';
import HelloWindow from './pages/homePage/homePage';
import UserRegistration from './pages/registration/registartionWindow';
import UserLogin from './pages/login/loginPage';
// import { useAppSelector } from './store/reducers';

function App() {
  const [logForm, setLogForm] = useState(false);
  const [regForm, setRegForm] = useState(false);
  // const history = useHistory();
  // const location = useLocation();
  // const urlParams = useHistory();

  // useEffect(() => getUsersByPage(urlParams), [urlParams])

  const dispatch = useDispatch();

  // const isAuth = useAppSelector((state) => state.user.auth)

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

  // useEffect(() => {
  //   dispatch(updateUserInformationToken());
  //   history.replace(from)
  // }, [dispatch, from, history])

  useEffect(() => {
    dispatch(updateUserInformationToken());
  }, [dispatch])

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
        {/* <AppRouter /> */}

        <Switch>
          <PrivateRoute path='/board' exact>
            <WorkSpace />
          </PrivateRoute>
          <PrivateRoute path='/board/:id/column' exact>
            <BoardSpace />
          </PrivateRoute>
          <PrivateRoute path='/user' exact>
            <UserPage />
          </PrivateRoute>
          <Route path='/' component={HelloWindow} exact />
          <Route path='/registration' component={UserRegistration} exact />
          <Route path='/login' component={UserLogin} exact />
          {/* <Route path="registration" component={UserRegistrationForm}/> */}

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
