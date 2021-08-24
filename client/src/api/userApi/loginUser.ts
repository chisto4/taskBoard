import instance from './index';

export const loginUser = async (user: {
  email: string,
  login: string,
  password: string,
}): Promise<void> => {
  const response = await instance.post('/login', user);    
  const result = await response.data;
  if (response.status === 200) {
    localStorage.setItem('token', result.token);
    // localStorage.setItem('name', result.userLogin.name,);
    // localStorage.setItem('surname', result.userLogin.surname);
    // localStorage.setItem('login', result.userLogin.login);
    // localStorage.setItem('dob', result.userLogin.dob);
    // console.log('data content', response.data);
    document.location.href = 'http://localhost:3000/user';
  }
  else {
    alert(result.message);
  }    
};
