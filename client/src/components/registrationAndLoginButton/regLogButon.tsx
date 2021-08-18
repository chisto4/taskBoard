import React, { SetStateAction } from 'react';

import {NavLink} from 'react-router-dom';

interface IHeader {
  onClickLog: () => void;
  onClickReg: () => void;
}

const RegistrationLoginButton: React.FC<IHeader> = ({onClickLog, onClickReg}) => {
  return (
      <div className="registration-logon-wrapper">
          <div className="userAuthWrapper">
            <button onClick={onClickLog} className="navLoginButton">
            <NavLink to="/login">Login</NavLink>
            </button>
            <button onClick={onClickReg} className="navRegistrationButton">
              <NavLink to="/registration">Registration</NavLink>
            </button>
          </div>
      </div>
  )}

export default RegistrationLoginButton;
