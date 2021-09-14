import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';

import './App.css';

import AppRouter from './api/routePage/AppRouter';
import Header from './pages/components/Header/Header';
import { updateUserInformationToken } from './store/userReducer/userThunk';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateUserInformationToken());
  }, [dispatch])

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <AppRouter />\
        <Switch>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
