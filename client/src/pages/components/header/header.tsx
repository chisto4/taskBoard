// import React, { SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import styles from './headerStyle.module.scss'
import { useAppSelector } from '../../../store/reducers';
import { logOutThunk } from '../../../store/userReducer/userThunk';

import userAvatar from '../../../image/user2.jpg';
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

  const isAuth = useAppSelector((state) => state.user.auth)
  const login = useAppSelector((state) => state.user.user.login)

  const testState = useAppSelector((state) => state)
  console.log(testState)

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        <span onClick={() => { history.push("/") }}>Task Board</span>

        <div className={styles.userAuthWrapper}>
          <div className={styles.user_avatar}>
            {isAuth && <img src={userAvatar} className={styles.circle_avatar} alt='User Avatar'></img>}
          </div>
          {isAuth && <span onClick={() => { history.push("/user") }} >{login}</span>}
          {isAuth && <span onClick={() => { history.push("/work") }} >Work Space</span>}
          {!isAuth && <span onClick={() => { history.push("/login") }} >Login</span>}
          {isAuth && <span onClick={(logOuting)} className={styles.log_out}>Log Out</span>}
          {!isAuth && <span onClick={() => { history.push("/registration") }}>Registration</span>}

          {/* <NavLink className={styles.RegLogLink} to="/registration"><a>Login</a></NavLink>
              <NavLink className={styles.RegLogLink} onClick={onClickReg} to="/registration">Registration</NavLink> */}
        </div>
      </div>

      <div className={styles.bottomLine}></div>
    </div>
  )
}

export default Header;
