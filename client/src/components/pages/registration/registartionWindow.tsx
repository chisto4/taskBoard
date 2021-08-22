import Main from "../../main/Main";

import React, {ReactNode, useEffect, useState} from 'react';
import styles from './userRegistrationFormStyle.module.scss';

import instance from '../../api/index'


interface IUserRegistrationForm {
  onClickReg: () => void;
  // id: number;
  // name: string;
  // lastName: string;
  // login: string;
  // email: string;
  // password: string;
  // avatarUrl: string;
}

const UserRegistration: React.FC<IUserRegistrationForm> = ({onClickReg}) => {

  const [name, setName] = useState('');
  const [surname, setLastName] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDOB] = useState('');

  const inputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value.toLocaleLowerCase())
  }
  const inputSurName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value.toLocaleLowerCase())
  }
  const inputLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value.toLocaleLowerCase())
  }
  const inputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value.toLocaleLowerCase())
  }
  const inputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const inputDOB = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDOB(event.target.value)
 }

  interface UserInterface {
    id: number;
    name: string;
    surname: string;
    login: string;
    email: string;
    token: string;
    dob: Date;
  }

  type Props = {
    children?: ReactNode | undefined;
  }

  const userInfo = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    debugger;

    const res = await instance.post('/registration',      
    {
      name: name,
      surname: surname,
      login: login,
      email: email,
      password: password,
      dob: dob
  })

  if (res.data === 'registered') {
    
  }
  debugger;

return false;
    // return (
    //     <div className={styles.userRegistrationSucces}>
    //       User Hes registration
    //       console.log('registracia rabotaet');
    //     </div>
    // );
  }  

//  const getUserIfo: React.FC<Props> = (props) =>{
//     const [state, setState] = useState<UserInterface[]>([]);
      
//     useEffect(() => {
//       console.log('getUserIfo')
//       instance.get('user')
//         .then(r => {
//           console.log('result', r.data)
//           setState(r.data)
//         })
//         .catch(e => console.log('error', e.message))
//     }, []);
  
//     return (
//     <main className={styles.main}>
//       {state.map(item => <h1 key={item.id}>{item.name}</h1>)}
//       {props.children}
//     </main>
//       );
//   }

  return (
    <Main>
      <form className={styles.form} onSubmit={userInfo}>
        <h1>REGISTRATION</h1>
        <input name='name' type="text" value={name} onChange={(e) => inputName(e)}  placeholder='Enter your Name'/>
        <input name='surname' type="text"  value={surname} onChange={(e) => inputSurName(e)} placeholder='Enter your Last Name'/>
        <input name='login' type="text"  value={login} onChange={(e) => inputLogin(e)} placeholder='Enter your Login'/>
        <input name='email' type="email"  value={email} onChange={(e) => inputEmail(e)} placeholder='Enter your Email'/>
        <input name='password' type="password" value={password} onChange={(e) => inputPassword(e)} placeholder='Enter your Password'/>
        <input name='dob' type="date" value={dob} onChange={(e) => inputDOB(e)} placeholder='Enter your Date of Born'/>
        <input name='avatarUrl' type="url" placeholder='Choice your Avatar'/>
          <button type="submit" className={styles.registrationButton}>REGISTRATION</button>
      </form>
    </Main>
    );
}

export default UserRegistration;
