// import React, { SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import styles from './headerStyle.module.scss'

import { baseURL } from '../../../api';
import baseAvatar from '../../../image/baseAvatar/baseAvatar.jpeg';
import homeIcon from '../../../icon/home_white.png';
import userIcon from '../../../icon/user_white.png';
import workSpaceIcon from '../../../icon/graf_board_white.png';
import loginIcon from '../../../icon/login_white.png';
import registrationIcon from '../../../icon/registration_white.png';
import logoutIcon from '../../../icon/logout_white.png';

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

    <div className={styles.header_nav_mobile}>
          <button className={styles.nav_button_wrapper} onClick={() => { history.push("/") }}>
            <img src={homeIcon} className={styles.nav_img} alt='homePage'></img>
          </button>
          {isAuth && <button className={styles.nav_button_wrapper} onClick={() => { history.push(USER) }}>
            <img src={userIcon} className={styles.nav_img} alt='userPage'></img>
          </button>}
          {isAuth && <button className={styles.nav_button_wrapper} onClick={() => { history.push(WORK_SPACE) }}>
            <img src={workSpaceIcon} className={styles.nav_img} alt='userPage'></img>
          </button>}
          {!isAuth && <button className={styles.nav_button_wrapper} onClick={() => { history.push(LOGIN) }}>
            <img src={loginIcon} className={styles.nav_img} alt='userPage'></img>
          </button>}
          {!isAuth && <button className={styles.nav_button_wrapper} onClick={() => { history.push(REGISTRATION) }}>
            <img src={registrationIcon} className={styles.nav_img} alt='userPage'></img>
          </button>}
          {isAuth && <button className={styles.nav_button_wrapper} onClick={(logOuting)}>
            <img src={logoutIcon} className={styles.nav_img} alt='userPage'></img>
          </button>}
    </div>

    </div>

  )
}

export default Header;
