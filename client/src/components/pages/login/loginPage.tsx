import Main from "../../main/Main";

import React from 'react';
import { useState } from 'react';
import styles from './loginPage.module.scss';

import instance from '../../api/index'


const UserLogin: React.FC = () => {

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value.toLocaleLowerCase())
    console.log('zalupa', login)
  }
  const inputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value.toLocaleLowerCase())
    console.log('zalupa', email)
  }
  const inputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    console.log('zalupa', password)
  }

  const userInfo = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const res = await instance. post('/login',      
    {
      "login": login,
      "email": email,
      "password": password,
  })
debugger
  }

  return (
    <Main>
      <form className={styles.form} onSubmit={userInfo}>
        <h1>LOG IN</h1>
        <input name='login' type="text"  value={login} onChange={(e) => inputLogin(e)} placeholder='Enter your Login'/>
        <input name='email' type="email"  value={email} onChange={(e) => inputEmail(e)} placeholder='Enter your Email'/>
        <input name='password' type="password" value={password} onChange={(e) => inputPassword(e)} placeholder='Enter your Password'/>
          <button type="submit" className={styles.registrationButton}>LOG IN</button>
      </form>
    </Main>
    );
}

export default UserLogin;
