import { Dispatch } from 'react';
import { Action } from 'redux';
import { updateUser } from '../../store/userReducer/actionUser';
import instance from './index';
import { usersInterface } from '../../types/types';

export const editUsers = (user: usersInterface, token: string) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {   
    const response = await instance.put('/users', user);    
    const result = await response.data;

    if (response.status == 200) {
      console.log(result);
      const users = [{
        id: user.id,
        surname: user.surname,
        email: user.email,
        dob: user.dob,
      }];
      dispatch(updateUser(users));
      document.location.href = 'http://localhost:3000/';
    }
    else {
      alert(result.message);
    }
  };
};