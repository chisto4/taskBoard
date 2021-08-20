// import React, { SetStateAction } from 'react';
import styles from './headerStyle.module.scss'

// import {NavLink} from 'react-router-dom';

interface IHeader {
  onClickLog: () => void;
  onClickReg: () => void;
}

const Header: React.FC<IHeader> = ({onClickLog, onClickReg}) => {
  return (
      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          <a href="/">Task Board</a>

          <div className={styles.userAuthWrapper}>
            <a href="/user">User Update test</a>
            <a href="/work">Work Space</a>
            <a href="/login">Login</a>
            <a href="/registration">Registration</a>

              {/* <NavLink className={styles.RegLogLink} to="/registration"><a>Login</a></NavLink>
              <NavLink className={styles.RegLogLink} onClick={onClickReg} to="/registration">Registration</NavLink> */}
          </div>
        </div>
        
        <div className={styles.bottomLine}></div>
      </div>
  )}

export default Header;
