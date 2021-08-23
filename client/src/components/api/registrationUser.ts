import { Dispatch } from 'react';
import { Action } from 'redux';

import {registrationUsers} from '../Redux/store/action';
import instance from './index';
import {loginUser} from './loginUser';

export const regUsers = (user: {
  name: string,
  surname: string,
  login: string,
  email: string,
  password: string,
  dob: Date,
}) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    try {
      const res = await instance.post('/registration', user);
      
      console.log(res.data);
      const users = [{ 
        id: res.data.id, 
        name: res.data.name,
        surname: res.data.surname,
        login: res.data.login,
        email: res.data.email, 
        dob: res.data.dob,
      }];

      console.log('User info registaration',user);

      dispatch(registrationUsers(users));
      loginUser(user);
      document.location.href = 'http://localhost:3000/login';

    } catch(e) {
      console.log(e);
    }
  };
};