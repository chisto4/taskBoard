import instance from './index';

export const getToken = async (token: string): Promise<boolean> => {
  
  try {
    const response = await instance('/token', {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': token
      }
    });
      
    const user = response.data;
    if (user) return true;
    return false;
  } catch(e) {
    console.log(e);
    return false;
  }

};