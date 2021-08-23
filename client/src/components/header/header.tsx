// import React, { SetStateAction } from 'react';
import styles from './headerStyle.module.scss'
import { useHistory } from "react-router-dom";

import {logOut} from "../api/logOut"
// import {NavLink} from 'react-router-dom';

interface IHeader {
  onClickLog: () => void;
  onClickReg: () => void;
}

const Header: React.FC<IHeader> = ({onClickLog, onClickReg}) => {
  let history = useHistory();

  return (
      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          <span onClick={() => {history.push("/")}}>Task Board</span>

          <div className={styles.userAuthWrapper}>
            <span onClick={() => {history.push("/user")}} >User Information</span>
            <span onClick={() => {history.push("/work")}} >Work Space</span>
            <span onClick={() => {history.push("/login")}} >Login</span>
            <span onClick={(logOut)}>Log Out</span>
            <span onClick={() => {history.push("/registration")}}>Registration</span>

              {/* <NavLink className={styles.RegLogLink} to="/registration"><a>Login</a></NavLink>
              <NavLink className={styles.RegLogLink} onClick={onClickReg} to="/registration">Registration</NavLink> */}
          </div>
        </div>
        
        <div className={styles.bottomLine}></div>
      </div>
  )}

export default Header;
