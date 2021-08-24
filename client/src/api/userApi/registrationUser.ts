
import { IUser } from "../../types/types";
import axios from './index';

export const regUser = async (user: IUser) => {
  try {
    const res = await axios.post('/registration', user);

    // const users = [{
    //   id: res.data.id,
    //   name: res.data.name,
    //   surname: res.data.surname,
    //   login: res.data.login,
    //   email: res.data.email,
    //   dob: res.data.dob,
    // }];

    console.log('User info registaration', res.data);

    // document.location.href = 'http://localhost:3000/login';
    return res.data

  } catch (e) {
    console.log(e);
  }
};