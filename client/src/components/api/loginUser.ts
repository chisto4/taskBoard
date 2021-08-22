import instance from './index';

export const loginUser = async (user: {
  email: string,
  login: string,
  password: string,
}): Promise<void> => {
  const response = await instance.post('/login', user);    
  const result = await response.data;
  if (response.status === 200) {
    localStorage.setItem('token', result);
    console.log('token test login routePage', result);
    document.location.href = 'http://localhost:3000/';
  }
  else {
    alert(result.message);
  }    
};
