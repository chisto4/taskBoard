import React from 'react';
import './loginFromStyle.css';
import closeButton from '../../icon/close.png'

interface IUserLoginForm {
  onClickLog: () => void;
  // id: number;
  // login: string;
  // email: string;
  // password: string;
}

const UserLoginForm: React.FC<IUserLoginForm> = ({onClickLog}) => {

  return (
    <>
      <form className="formLogin loginFormVision">
        <h1>Login</h1>
        <button onClick={onClickLog} className="closeButton" >
          <img src={closeButton} className="icon" alt="closeButton" />
        </button>
        <input name='login' type="text" placeholder='Enter your Login' />
        <input name='email' type="email" placeholder='Enter your Email' />
        <input name='password' type="password" placeholder='Enter your Password' />
        <button type="submit" className="loginButton">LOGIN</button>
      </form>
    </>
  );
}

export default UserLoginForm;
