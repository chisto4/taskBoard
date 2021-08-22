// import React, { SetStateAction } from 'react';
import styles from './headerStyle.module.scss'
import { useHistory } from "react-router-dom";

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
          <a onClick={() => {history.push("/")}}>Task Board</a>

          <div className={styles.userAuthWrapper}>
            <a onClick={() => {history.push("/user")}} >User Update test</a>
            <a onClick={() => {history.push("/work")}} >Work Space</a>
            <a onClick={() => {history.push("/login")}} >Login</a>
            <a onClick={() => {history.push("/registration")}}>Registration</a>

              {/* <NavLink className={styles.RegLogLink} to="/registration"><a>Login</a></NavLink>
              <NavLink className={styles.RegLogLink} onClick={onClickReg} to="/registration">Registration</NavLink> */}
          </div>
        </div>
        
        <div className={styles.bottomLine}></div>
      </div>
  )}

export default Header;
