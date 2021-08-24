
import React, { useState } from 'react';

import styles from './loginPage.module.scss';
import Main from "../../api/userApi/components/main/Main";
import { useSelector, useDispatch } from 'react-redux';
import { IUser } from '../../types/types';
import { loginUser } from "../../store/userReducer/userThunk";
import { useAppSelector } from '../../store/reducers';

const UserLogin: React.FC = (): JSX.Element => {
  const [userLogin, setUserLogin] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const stateChange = useAppSelector((state) => state.user)

  console.log('info', stateChange);

  const dispatch = useDispatch();

  const userInfo: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log('event', event);

    const user: IUser = {
      login: userLogin,
      email: userEmail,
      password: userPassword,
      name: '',
      surname: '',
      dob: ''
    };
    dispatch(loginUser(user));

  };
  return (
    <Main>
      <form className={styles.form} onSubmit={userInfo}>
        <h1>REGISTRATION</h1>
        <input onChange={(e) => setUserLogin(e.target.value)} name='login' type="text" placeholder='Enter your Login' />
        <input onChange={(e) => setUserEmail(e.target.value)} name='email' type="email" placeholder='Enter your Email' />
        <input onChange={(e) => setUserPassword(e.target.value)} name='password' type="password" placeholder='Enter your Password' />
        <button type="submit" className={styles.registrationButton}>LOGIN</button>
      </form>
    </Main>
  );
}
export default UserLogin;
