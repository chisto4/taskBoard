
import React, { useEffect, useState } from 'react';

import styles from './loginPage.module.scss';
import Main from "../components/main/Main";
import closeButton  from '../../icon/close.png';

import { useSelector, useDispatch } from 'react-redux';
import { IUser } from '../../types/types';
import { loginUser } from "../../store/userReducer/userThunk";
import { useAppSelector } from '../../store/reducers';
import { useHistory } from 'react-router';

const UserLogin: React.FC = (): JSX.Element => {
  const [userLogin, setUserLogin] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const auth = useAppSelector((state) => state.user.auth)
  let history = useHistory();
  const dispatch = useDispatch();

  const errorWrapper = useAppSelector((state) => state.user.error)
  const [moadlMessage, setMoadlMessage] = useState<string | null>('');

  const userInfo: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log('event', event);

    const user: IUser = {
      login: userLogin,
      email: userEmail,
      password: userPassword,
      name: '',
      surname: '',
      dob: '',
      avatarId: null,
      Image: null
    };
    dispatch(loginUser(user));
    setMoadlMessage(errorWrapper)
  };

  useEffect(() => {
    if (auth) { history.push("/user") }
  }, [auth, history])

  return (
    <Main>

{moadlMessage && <div className={styles.modal_Inform_Window}>
      <div className={styles.modal_Inform_Window_h4}>
        <h4>Sorry, but something went wrong:</h4>
        <h6>{moadlMessage}</h6>
      </div>
      <div className={styles.modal_Inform_Window_link}>
      <a onClick={() => setMoadlMessage('')}>
      <img src={closeButton} className={styles.close_button} alt='User Avatar'></img>
      </a>
      </div>
    </div>}

      <form className={styles.form} onSubmit={userInfo}>
        <h1>LOGIN</h1>
        <input onChange={(e) => setUserLogin(e.target.value)} name='login' type="text" placeholder='Enter your Login' />
        <input onChange={(e) => setUserEmail(e.target.value)} name='email' type="email" placeholder='Enter your Email' />
        <input onChange={(e) => setUserPassword(e.target.value)} name='password' type="password" placeholder='Enter your Password' />
        <button type="submit" className={styles.registrationButton}>LOGIN</button>
      </form>
    </Main>
  );
}
export default UserLogin;
