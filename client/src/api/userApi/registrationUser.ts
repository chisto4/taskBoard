
import { IUser } from "../../types/types";
import axios from './index';

export const regUser = async (user: IUser) => {
  try {
    const res = await axios.post('/registration', user);
    console.log('User info registaration', res.data);
    // document.location.href = 'http://localhost:3000/login';
    return res.data

  } catch (e) {
    console.log(e);
  }
};