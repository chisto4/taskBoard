import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router";
import { useAppSelector } from "../../store/reducers";

import styles from './userRegistrationFormStyle.module.scss';

import { IUser } from "../../types/types";
import Main from "../components/Main/Main";
import closeButton from '../../icon/close.png';
import { registrationUsers } from "../../store/userReducer/userThunk";

const UserRegistration: React.FC = (): JSX.Element => {
  const [userName, setUserName] = useState('');
  const [userSurName, setUserSurName] = useState('');
  const [userLogin, setUserLogin] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userDob, setUserDob] = useState('');

  const auth = useAppSelector((state) => state.user.auth)

  const errorWrapper = useAppSelector((state) => state.user.error)
  const [modalMessage, setModalMessage] = useState<string | null>('');

  const dispatch = useDispatch();

  let history = useHistory();


  const userInfo: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const parseDate = new Date(userDob);

    const user: IUser = {
      name: userName,
      surname: userSurName,
      login: userLogin,
      email: userEmail,
      password: userPassword,
      dob: parseDate,
      avatarId: null
    };
    dispatch(registrationUsers(user));
    setModalMessage(errorWrapper)
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
        <h1>REGISTRATION</h1>
        <input onChange={(e) => setUserName(e.target.value)} name='name' type="text" placeholder='Enter your Name' />
        <input onChange={(e) => setUserSurName(e.target.value)} name='surname' type="text" placeholder='Enter your Last Name' />
        <input onChange={(e) => setUserLogin(e.target.value)} name='login' type="text" placeholder='Enter your Login' />
        <input onChange={(e) => setUserEmail(e.target.value)} name='email' type="email" placeholder='Enter your Email' />
        <input onChange={(e) => setUserPassword(e.target.value)} name='password' type="password" minLength={4} maxLength={50} placeholder='Enter your Password' />
        <input onChange={(e) => setUserDob(e.target.value)} name='dob' type="date" placeholder='Enter your Date of Born' />
        <button type="submit" className={styles.registrationButton}>REGISTRATION</button>
      </form>
    </Main>
  );
}
export default UserRegistration;