import React from 'react';
import { useState } from 'react';
import './userRegistrationFormStyle.css';
import closeButton from '../../icon/close.png'

interface IUserRegistrationForm {
  onClickReg: () => void;
  // id: number;
  // name: string;
  // lastName: string;
  // login: string;
  // email: string;
  // password: string;
  // avatarUrl: string;
}

const UserRegistrationForm: React.FC<IUserRegistrationForm> = ({onClickReg}) => {

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  interface AnyInput {
    inputName: any;
  }

  const inputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
    console.log('zalupa', name)
  }
  const inputLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value)
    console.log('zalupa', lastName)
  }
  const inputLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value)
    console.log('zalupa', login)
  }
  const inputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    console.log('zalupa', email)
  }
  const inputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    console.log('zalupa', password)
  }

  return (
    <form className="form">
      <h1>Registration</h1>
      <button onClick={onClickReg} className="closeButton">
        <img src={closeButton} className="icon" alt="closeButton"/>
      </button>
      <input name='name' type="text" value={name} onChange={(e) => inputName(e)}  placeholder='Enter your Name'/>
      <input name='lastName' type="text"  value={lastName} onChange={(e) => inputLastName(e)} placeholder='Enter your Last Name'/>
      <input name='login' type="text"  value={login} onChange={(e) => inputLogin(e)} placeholder='Enter your Login'/>
      <input name='email' type="email"  value={email} onChange={(e) => inputEmail(e)} placeholder='Enter your Email'/>
      <input name='password' type="password" value={password} onChange={(e) => inputPassword(e)} placeholder='Enter your Password'/>
      <input name='avatarUrl' type="url" placeholder='Choice your Avatar'/>
        <button type="submit" className="registrationButton">REGISTRATION</button>
    </form>
    );
}

export default UserRegistrationForm;
