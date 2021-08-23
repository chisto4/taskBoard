import Main from "../../main/Main";

import React, {ReactNode, useEffect, useState, FormEvent} from 'react';
import {useDispatch} from 'react-redux';
import styles from './userRegistrationFormStyle.module.scss';

import instance from '../../api/index'
import {regUsers} from '../../api/registrationUser';

const UserRegistration: React.FC = ():JSX.Element => {

  const dispatch = useDispatch();

  const userInfo = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

      const {name, surname, login, password, email, dob} = event.currentTarget;

      const user = {
        name: name.value,
        surname: surname.value,
        login: login.value,
        email: email.value,
        password: password.value,
        dob: dob.value,
        // avatar: avatar.value,
    };
    console.log('zalupa', user)
      dispatch(regUsers(user));
  };

  return (
    <Main>
      <form action="" className={styles.form} onSubmit={userInfo}>
        <h1>REGISTRATION</h1>
        <input name='name' type="text" placeholder='Enter your Name'/>
        <input name='surname' type="text"placeholder='Enter your Last Name'/>
        <input name='login' type="text" placeholder='Enter your Login'/>
        <input name='email' type="email" placeholder='Enter your Email'/>
        <input name='password' type="password" placeholder='Enter your Password'/>
        <input name='dob' type="date" placeholder='Enter your Date of Born'/>
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


