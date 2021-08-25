// import React, { SetStateAction } from 'react';
import styles from './headerStyle.module.scss'
import { useHistory } from "react-router-dom";
import {logOut} from "../../logOut"
// import {NavLink} from 'react-router-dom';

import useRoutes from '../../../routePage/useMemo';
import { useAppSelector } from '../../../../store/reducers';
import { logOutThunk } from '../../../../store/userReducer/userThunk';
import { useDispatch } from 'react-redux';

interface IHeader {
  onClickLog: () => void;
  onClickReg: () => void;
}

const Header: React.FC<IHeader> = ({onClickLog, onClickReg}) => {

  const dispatch = useDispatch();

  let history = useHistory();
  function logOuting() {
    dispatch(logOutThunk());
    localStorage.clear();
    history.push("/");
  }
  
  const isAuth = useAppSelector((state) => state.user.auth)
  const testState = useAppSelector((state) => state)
  console.log(testState)
 
  return (
      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          <span onClick={() => {history.push("/")}}>Task Board</span>

          <div className={styles.userAuthWrapper}>
            {isAuth && <span onClick={() => {history.push("/user")}} >User Information</span>}
            {isAuth && <span onClick={() => {history.push("/work")}} >Work Space</span>}
            {!isAuth && <span onClick={() => {history.push("/login")}} >Login</span>}
            {isAuth && <span onClick={(logOuting)} className={styles.log_out}>Log Out</span>}
            {!isAuth && <span onClick={() => {history.push("/registration")}}>Registration</span>}

              {/* <NavLink className={styles.RegLogLink} to="/registration"><a>Login</a></NavLink>
              <NavLink className={styles.RegLogLink} onClick={onClickReg} to="/registration">Registration</NavLink> */}
          </div>
        </div>
        
        <div className={styles.bottomLine}></div>
      </div>
  )}

export default Header;
