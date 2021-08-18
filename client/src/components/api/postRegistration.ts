import axios from 'axios';
import { URL_HOME_PAGE } from '../utils/consts';

import { Dispatch } from 'react';
import { Action } from 'redux';
import { addUsers } from '../store/action';
import { instance } from '.';

axios.post('/registartion', {
  firstName: 'Fred',
  lastName: 'Flintstone'
})
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});

export const postUsers = (user: {
  name: string,
  surname: string,
  login: string,
  email: string,
  password: string,
  dob: Date,
  avatar: string
}) => {
    try {
      const response = instance.post('/registration', user);
      
      console.log(response.data);
      const users = [{ 
        id: response.data.id, 
        surname: response.data.surname,
        login: response.data.login,
        email: response.data.email, 
        dob: response.data.dob
      }];

      console.log(users);

    } catch(e) {
      console.log(e);
    }
};