import { Dispatch } from 'react';
import { Action } from 'redux';

import axios from '../index';
import { IUser, ILogUser } from "../../types/types";

export const regUser = async (user: IUser) => {
  const res = await axios.post('/registration', user);
  console.log('ZALUPDA', res)
  return res.data
};

export const logUser = async (user: ILogUser) => {
  const res = await axios.post('/login', user);
  return res.data
};

export const getToken = async () => {
  const res = await axios.get('/token');
  return res.data
};

export const getUsers = async () => {
  const res = await axios.get('/users');
  return res.data
};

export const editUsers = async (user: IUser) => {
  const res = await axios.put('/user', user);
  if (res.status === 200) {
  }
  return res.data
};

export const editUsersEmailPassword = async (user: IUser) => {
  const res = await axios.put('/user/email', user);
  if (res.status === 200) {
  }
  return res.data
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

      headers: { Authorization: localStorage.getItem('token') }
    })

    const result = await response.data;

    if (response.status === 200) {
      document.location.href = 'http://localhost:3000/';
    }
    else {
      alert(result.message);
    }
  };
};