import instance from './index';

export const getToken = async (token: string): Promise<boolean> => {

  try {
    const response = await instance('/token');
      
    const user = response.data;
    if (user) return true;
    return false;
  } catch(e) {
    console.log(e);
    return false;
  }

};