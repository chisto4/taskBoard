// import React, { SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import styles from './headerStyle.module.scss'

import { baseURL } from '../../../api';
import baseAvatar from '../../../image/baseAvatar/baseAvatar.jpeg';
import { useAppSelector } from '../../../store/reducers';
import { logOutThunk } from '../../../store/userReducer/userThunk';
import { LOGIN, REGISTRATION, USER, WORK_SPACE } from '../../../api/const/const';


const Header: React.FC = () => {

  const dispatch = useDispatch();
  let history = useHistory();
  function logOuting() {
    dispatch(logOutThunk());
    localStorage.clear();
    history.push("/");
  }

  const image = useAppSelector((state) => state.user.user.Image)
  const urlAvatar = !image ? baseAvatar : baseURL + '/' + image?.pathImages;

  const isAuth = useAppSelector((state) => state.user.auth)
  const login = useAppSelector((state) => state.user.user.login)

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        <span onClick={() => { history.push("/") }}>Task Board</span>

        <div className={styles.userAuthWrapper}>
          <div className={styles.user_avatar}>
            {isAuth && <img src={urlAvatar} className={styles.circle_avatar} 
            onClick={() => { history.push(USER) }} alt='User Avatar'></img>}
          </div>
          {isAuth && <span onClick={() => { history.push(USER) }} >{login}</span>}
          {isAuth && <span onClick={() => { history.push(WORK_SPACE) }} >Work Space</span>}
          {!isAuth && <span onClick={() => { history.push(LOGIN) }} >Login</span>}
          {isAuth && <span onClick={(logOuting)} className={styles.log_out}>Log Out</span>}
          {!isAuth && <span onClick={() => { history.push(REGISTRATION) }}>Registration</span>}
        </div>
      </div>

      <div className={styles.bottomLine}></div>
    </div>
  )
}

export default Header;
