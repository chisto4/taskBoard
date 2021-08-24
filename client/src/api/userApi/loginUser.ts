import { ILogUser } from '../../types/types';
import instance from './index';

export const logUser = async (user: ILogUser) => {
  try{
    const res = await instance.post('/login', user);
    return res.data
  } catch (e) {
    console.log(e);
  }
};

//     const result = await res.data;  
//   }
//   if (response.status === 200) {
//     localStorage.setItem('token', result.token);
//     // document.location.href = 'http://localhost:3000/user';
//   }
//   else {
//     alert(result.message);
//   }    
// };
