import React, { SetStateAction } from 'react';
import './headerStyle.css';

import {NavLink} from 'react-router-dom';
import { Dispatch } from 'redux';

interface IHeader {
  onClickLog: () => void;
  onClickReg: () => void;
}

const Header: React.FC<IHeader> = ({onClickLog, onClickReg}) => {
  return (
      <div className="headerWrapper">
        <div className="header">
          <a href="#">Task Board</a>
          <div className="userAuthWrapper">
            <button onClick={onClickLog} className="navLoginButton">
            <NavLink to="/login">Login</NavLink>
            </button>
            <button onClick={onClickReg} className="navRegistrationButton">
              <NavLink to="/registration">Registration</NavLink>
            </button>
          </div>
        </div>
        <div className="bottomLine"></div>
      </div>
  )}

export default Header;
