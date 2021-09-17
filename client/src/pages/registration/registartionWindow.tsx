import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router";
import { useAppSelector } from "../../store/reducers";

import styles from './userRegistrationFormStyle.module.scss';

import { IUser } from "../../types/types";
import Main from "../components/Main/Main";
import closeButton from '../../icon/close_white.png';
import { registrationUsers } from "../../store/userReducer/userThunk";
import { actionsSetError } from '../../store/userReducer/actionUser';

const UserRegistration: React.FC = (): JSX.Element => {
  const [userName, setUserName] = useState('');
  const [userSurName, setUserSurName] = useState('');
  const [userLogin, setUserLogin] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [confirmCUerPassword, setConfirmUserPassword] = useState('');
  const [userDob, setUserDob] = useState('');

  const auth = useAppSelector((state) => state.user.auth)

  const errorStatus = useAppSelector((state) => state.user.error)
  const [modalMessage, setModalMessage] = useState<string | null>('');

  const dispatch = useDispatch();

  let history = useHistory();

  const clearError = () => {
    setModalMessage('')
    dispatch(actionsSetError(null));
  }

  const userInfo: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const parseDate = new Date(userDob);
    if(userPassword !== confirmCUerPassword)return setModalMessage('PASSWOR MISTMACH')

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
    if(errorStatus) setModalMessage(errorStatus)
    dispatch(actionsSetError(null));
  };

  useEffect(() => {
    if(errorStatus !== 'Users not  authorization second Falls')setModalMessage('Please input correct information')
    if(errorStatus)setModalMessage(errorStatus)
    if (auth) { history.push("/user") }
  }, [auth, history, errorStatus])

  return (
    <Main>

      {modalMessage && <div className={styles.modal_Inform_Window}>
        <div className={styles.modal_Inform_Window_h4}>
          <h4>Sorry, but:</h4>
          <h6>{modalMessage}</h6>
        </div>
        <div className={styles.modal_Inform_Window_link}>
          <button className={styles.close_button_wrapper} onClick={() => clearError()}>
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
        <input onChange={(e) => setConfirmUserPassword(e.target.value)} name='Confirm_Password' type="password" minLength={4} maxLength={50} placeholder='Confirm Password' />
        <input onChange={(e) => setUserDob(e.target.value)} name='dob' type="date" placeholder='Enter your Date of Born' />
        <button type="submit" className={styles.registrationButton}>REGISTRATION</button>
      </form>
    </Main>
  );
}
export default UserRegistration;