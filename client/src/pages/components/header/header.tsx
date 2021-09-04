// import React, { SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import styles from './headerStyle.module.scss'
import { useAppSelector } from '../../../store/reducers';
import { logOutThunk } from '../../../store/userReducer/userThunk';

import baseAvatar from '../../../image/wtf.jpeg';
import { baseURL } from '../../../api';
import { LOGIN, REGISTRATION, USER, WORK_SPACE } from '../../../api/const/const';
// import {NavLink} from 'react-router-dom';

interface IHeader {
  onClickLog: () => void;
  onClickReg: () => void;
}

const Header: React.FC<IHeader> = ({ onClickLog, onClickReg }) => {

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

  const testState = useAppSelector((state) => state)
  console.log("testState", testState)

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        <span onClick={() => { history.push("/") }}>Task Board</span>

        <div className={styles.userAuthWrapper}>
          <div className={styles.user_avatar}>
            {isAuth && <img src={urlAvatar} className={styles.circle_avatar} alt='User Avatar'></img>}
          </div>
          {isAuth && <span onClick={() => { history.push(USER) }} >{login}</span>}
          {isAuth && <span onClick={() => { history.push(WORK_SPACE) }} >Work Space</span>}
          {!isAuth && <span onClick={() => { history.push(LOGIN) }} >Login</span>}
          {isAuth && <span onClick={(logOuting)} className={styles.log_out}>Log Out</span>}
          {!isAuth && <span onClick={() => { history.push(REGISTRATION) }}>Registration</span>}

          {/* <NavLink className={styles.RegLogLink} to="/registration"><a>Login</a></NavLink>
              <NavLink className={styles.RegLogLink} onClick={onClickReg} to="/registration">Registration</NavLink> */}
        </div>
      </div>

      <div className={styles.bottomLine}></div>
    </div>
  )
}

export default Header;
