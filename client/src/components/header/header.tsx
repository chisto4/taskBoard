import React, { SetStateAction } from 'react';
import './headerStyle.css';

import {NavLink} from 'react-router-dom';
// import { Dispatch } from 'redux';

interface IHeader {
  onClickLog: () => void;
  onClickReg: () => void;
}


const Header: React.FC<IHeader> = ({onClickLog, onClickReg}) => {
  return (
      <div className="headerWrapper">
        <div className="header">
          <a href="/work">Task Board</a>
          <div className="userAuthWrapper">
            <NavLink className="RegLogLink" onClick={onClickLog} to="/login">Login</NavLink>
            <a className="RegLogLink" onClick={onClickLog} href="/login">Login</a>
            <NavLink className="RegLogLink" onClick={onClickReg} to="/registration">Registration</NavLink>

          </div>
        </div>
        <div className="bottomLine"></div>
      </div>
  )}

export default Header;
