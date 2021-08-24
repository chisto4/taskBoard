import { Dispatch } from 'react';
import { Action } from 'redux';
// import {deleteUser} from '../../store/userReducer/actionUser';
import axios from './index';

export const deleteUsers = (user: {
  id: number,
  email: string,
  password: string,
}, token: string) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
   
    const response = await axios.delete(`/users/${user.id}`, {

    headers: { Authorization:localStorage.getItem('token') } })
            // .then(response=> console.log(response))
            // .catch(error => console.log(error));


    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8',
    //     'authorization': token
    //   }
    // });
    
    const result = await response.data;
    
    if (response.status === 200) {
      console.log(result);
      const users = [{
        id: user.id,
        email: user.email,
      }];
      document.location.href = 'http://localhost:3000/';
    }
    else {
      alert(result.message);
    }
  };
};