
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useAppSelector } from '../../store/reducers';
import { IUser } from '../../types/types';

import styles from './loginPage.module.scss';
import Main from "../components/Main/Main";
import closeButton from '../../icon/close.png';

import { loginUser } from "../../store/userReducer/userThunk";

const UserLogin: React.FC = (): JSX.Element => {
  const [userLogin, setUserLogin] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const auth = useAppSelector((state) => state.user.auth)
  let history = useHistory();
  const dispatch = useDispatch();

  const errorStatus = useAppSelector((state) => state.user.error)
  const [modalMessage, setModalMessage] = useState<string | null>('');

  const userInfo: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

const errorAlert = () => {
  setModalMessage(errorStatus)
}
    const user: IUser = {
      name: '',
      dob: '',
      surname: '',
      avatarId: null,
      login: userLogin,
      email: '',
      password: userPassword,
    };
    dispatch(loginUser(user));
    if(errorStatus){
      setTimeout(errorAlert, 2000)
    }
  };

  useEffect(() => {
    if (auth) { history.push("/user") }
  }, [auth, history])

  return (
    <Main>

      {modalMessage && <div className={styles.modal_Inform_Window}>
        <div className={styles.modal_Inform_Window_h4}>
          <h4>Sorry, but something went wrong:</h4>
          <h6>{modalMessage}</h6>
        </div>
        <div className={styles.modal_Inform_Window_link}>
          <button className={styles.close_button_wrapper} onClick={() => setModalMessage('')}>
            <img src={closeButton} className={styles.close_button} alt='User Avatar'></img>
          </button>
        </div>
      </div>}

      <form className={styles.form} onSubmit={userInfo}>
        <h1>LOGIN</h1>
        <input onChange={(e) => setUserLogin(e.target.value)} name='login' type="text" placeholder='Enter your Login' />
        {/* <input onChange={(e) => setUserEmail(e.target.value)} name='email' type="email" placeholder='Enter your Email' /> */}
        <input onChange={(e) => setUserPassword(e.target.value)} name='password' type="password" placeholder='Enter your Password' />
        <button type="submit" className={styles.registrationButton}>LOGIN</button>
      </form>
    </Main>
  );
}
export default UserLogin;
