import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import UserRegistrationForm from './components/modalWindows/userRegistrationForm/UserRegistrationForm'
import AppRouter from './components/routePage/AppRouter';

import Main from './components/main/Main';
import Component1 from './components/styleComponent/cssModul';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Main/>
          <AppRouter/>\

          <Switch>
            <Route path="/registration" component={UserRegistrationForm}/>
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
