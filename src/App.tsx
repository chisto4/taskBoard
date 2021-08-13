import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import UserRegistrationForm from './components/userRegistrationForm/UserRegistrationForm'


import Main from './components/main/Main';
import Component1 from './components/styleComponent/cssModul';

function App() {
  return (
    <BrowserRouter>
    <Component1 />
      <div className="App">
        <header className="App-header">
          <Main/>
          <Switch>
            <Route path="registration" component={UserRegistrationForm}/>
          </Switch>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
