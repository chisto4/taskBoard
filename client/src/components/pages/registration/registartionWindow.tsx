import Main from "../../main/Main";

import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import styles from './userRegistrationFormStyle.module.scss';

import {regUsers} from '../../api/registrationUser';
import { loginUser } from "../../api/loginUser";

const UserRegistration: React.FC = ():JSX.Element => {
  const [userName, setUserName] = useState('');
  const [userSurName, setUserSurName] = useState('');
  const [userLogin, setUserLogin] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userDob, setUserDob] = useState('');

  const dispatch = useDispatch();

  const userInfo = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
      console.log('event', event);
      const parseDate = new Date(userDob);
          
      const user = {
        name: userName,
        surname: userSurName,
        login: userLogin,
        email: userEmail,
        password: userPassword,
        dob: parseDate,
    };
    // console.log('zalupa', user)
      dispatch(regUsers(user));
  };

  return (
    <Main>
      <form className={styles.form} onSubmit={userInfo}>
        <h1>REGISTRATION</h1>
        <input onChange={(e) => setUserName(e.target.value)} name='name' type="text" placeholder='Enter your Name'/>
        <input onChange={(e) => setUserSurName(e.target.value)} name='surname' type="text"placeholder='Enter your Last Name'/>
        <input onChange={(e) => setUserLogin(e.target.value)} name='login' type="text" placeholder='Enter your Login'/>
        <input onChange={(e) => setUserEmail(e.target.value)} name='email' type="email" placeholder='Enter your Email'/>
        <input onChange={(e) => setUserPassword(e.target.value)} name='password' type="password" placeholder='Enter your Password'/>
        <input onChange={(e) => setUserDob(e.target.value)} name='dob' type="date" placeholder='Enter your Date of Born'/>
        {/* <input name='avatar' type="text" placeholder='Choice your Avatar'/> */}
          <button type="submit" className={styles.registrationButton}>REGISTRATION</button>
      </form>
    </Main>
    );
}

export default UserRegistration;
 

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


