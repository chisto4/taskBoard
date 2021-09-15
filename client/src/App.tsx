import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';

import './App.css';

import AppRouter from './api/routePage/AppRouter';
import Header from './pages/components/Header/Header';
import { updateUserInformationToken } from './store/userReducer/userThunk';
import { useAppSelector } from './store/reducers';

function App() {

  const isAuth = useAppSelector((state) => state.user.auth)
  const [isRes, setRes] = useState(false);
  const token = localStorage.getItem('token')

  const dispatch = useDispatch();

  useEffect(() => {
    (async()=>{
      await dispatch(updateUserInformationToken())
      setRes(true)
    })()
  }, [dispatch])

  return (
    <BrowserRouter>
      {isRes && <div className="App">
        <Header />
        <AppRouter />
        <Switch>
        </Switch>
      </div>}
    </BrowserRouter>
  );
}

export default App;
