
export const logOut = (): void => {
  localStorage.clear();
  document.location.href = 'http://localhost:3000/';
};
