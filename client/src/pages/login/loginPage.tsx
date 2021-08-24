
import React from 'react';
import { FormEvent } from 'react';

import styles from './loginPage.module.scss';
import { loginUser } from '../../api/userApi/loginUser';
import Main from "../../api/userApi/components/main/Main";


const UserLogin: React.FC = (user):JSX.Element => {

  const userInfo = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const {password, login, email} = event.currentTarget;
    const user = {
        login: login.value,
        email: email.value,
        password: password.value,
      };
    loginUser(user);
  };
    return (
      <Main>
        <form className={styles.form} onSubmit={userInfo}>
          <h1>LOG IN</h1>
          <input name='login' type="text"  placeholder='Enter your Login'/>
          <input name='email' type="email"  placeholder='Enter your Email'/>
          <input name='password' type="password" placeholder='Enter your Password'/>
            <button type="submit" className={styles.registrationButton}>LOG IN</button>
        </form>
      </Main>
      );
  }

export default UserLogin;
