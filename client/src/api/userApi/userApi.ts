import { Dispatch } from 'react';
import { Action } from 'redux';
import { IUser, ILogUser } from "../../types/types";
import axios from './index';

export const regUser = async (user: IUser) => {
  try {
    const res = await axios.post('/registration', user);
    console.log('User info registaration', res.data);
    return res.data

  } catch (e) {
    console.log(e);
  }
};

export const logUser = async (user: ILogUser) => {
  try{
    const res = await axios.post('/login', user);
    return res.data
  } catch (e) {
    console.log(e);
  }
};

export const getToken = async () => {  
  try {
    const res = await axios.get('/token');
    console.log('User info token update', res.data);
    return res.data
  } catch (e) {
    console.log(e);
  }
};

export const editUsers = async (user: IUser) => {
  try {
    const res = await axios.put('/user', user);
    console.log('User info update', res.data);
    // document.location.href = 'http://localhost:3000/login';
    return res.data

  } catch (e) {
    console.log(e);
  }
};

export const logOut = (): void => {
  localStorage.clear();
  document.location.href = 'http://localhost:3000/';
};


export const deleteUsers = (user: {
  id: number,
  email: string,
  password: string,
}, token: string) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
   
    const response = await axios.delete(`/users/${user.id}`, {

    headers: { Authorization:localStorage.getItem('token') } })
    
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
// export const editUsers = async (user: IUser) => {
//   try {
//     const res = await axios.put('/user', user);
//     console.log('User info registaration', res.data);
//     // document.location.href = 'http://localhost:3000/login';
//     return res.data

//   } catch (e) {
//     console.log(e);
//   }
// };

// export const getToken = async () => {  
//   try {
//     const res = await axios.get('/token');
//     console.log('User info token update', res.data);
//         if (res.status == 200) {
//       console.log(res);
//       const users = [{
//         id: user.id,
//         surname: user.surname,
//         email: user.email,
//         dob: user.dob,
//       }];
//     return res.data
//   } catch (e) {
//     console.log(e);
//   }
// };
