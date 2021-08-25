
import axios from './index';
import { logUser } from './loginUser';


export const getToken = () => async (): Promise<any> => {  try {
    const res = await axios.get('/token');
    console.log('User info token update', res.data.user);
    let user = res.data;
    logUser(user.user)
    return res.data
  } catch (e) {
    console.log(e);
  }
};

// import axios from './index';


// export const getToken = () => async (): Promise<any> => {  try {
//     const res = await axios.get('/token');
//     console.log('User info token update', res.data);
//     return res.data

//   } catch (e) {
//     console.log(e);
//   }
// };