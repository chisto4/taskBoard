export const logOut = (): void => {
  localStorage.setItem('token', '');
  localStorage.setItem('name', '');
  localStorage.setItem('surname', '');
  localStorage.setItem('login', '');
  localStorage.setItem('dob', '');
  localStorage.setItem('id', '');
  document.location.href = 'http://localhost:3000/';
};
