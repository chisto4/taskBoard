import { Dispatch } from 'react';
import { Action } from 'redux';
import instance from './index';
import { IUser, usersInterface } from '../../types/types';
import axios from './index';

// export const editUsers = (user: usersInterface, token: string) => {
//   return async (dispatch: Dispatch<Action>): Promise<void> => {   
//     const response = await instance.put('/user', user);    
//     const result = await response.data;

//     if (response.status == 200) {
//       console.log(result);
//       const users = [{
//         id: user.id,
//         surname: user.surname,
//         email: user.email,
//         dob: user.dob,
//       }];
//       // dispatch(updateUser(users));
//       document.location.href = 'http://localhost:3000/';
//     }
//     else {
//       alert(result.message);
//     }
//   };
// };

export const editUsers = async (user: IUser) => {
  try {
    const res = await axios.put('/user', user);
    console.log('User info registaration', res.data);
    // document.location.href = 'http://localhost:3000/login';
    return res.data

  } catch (e) {
    console.log(e);
  }
};