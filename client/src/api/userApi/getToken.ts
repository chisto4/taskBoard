// import instance from './index';

// export const getToken = async (token: string): Promise<boolean> => {

//   try {
//     const response = await instance('/token');
      
//     const user = response.data;
//     if (user) return true;
//     return false;
//   } catch(e) {
//     console.log(e);
//     return false;
//   }

// };


import { IUser } from "../../types/types";
import axios from './index';


export const getToken = async (user: IUser) => {
  try {
    const res = await axios.get('/token');
    console.log('User info token update', res.data);
    return res.data

  } catch (e) {
    console.log(e);
  }
};