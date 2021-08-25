import Main from "../../api/userApi/components/main/Main";
// import {useDispatch, useSelector} from "react-redux";
// import { FormEvent } from 'react';

import styles from './userPage.module.scss';
import userAvatar from '../../image/georgeMaichael.jpeg';
import { useAppSelector } from "../../store/reducers";
import { useState } from "react";
import { IUser } from "../../types/types";
import { updateUser } from "../../store/userReducer/userThunk";
import { useDispatch } from "react-redux";
import { format, compareAsc } from 'date-fns'
// import {deleteUsers} from '../..//api/deleteUser'
// import {editUsers} from '../..//api/updateUser'

  // const userInfo = async (event: { preventDefault: () => void; }) => {
  //   const res = await instance.post('/user',      
  //   {
  //     name: name,
  //     surname: surname,
  //     login: login,
  //     email: email,
  //     password: password,
  //     dob: dob
  // })
  //   event.preventDefault();

  //   return (
  //       <div className={styles.userRegistrationSucces}>
  //         User Hes registration
  //         console.log('registracia rabotaet');
  //       </div>
  //   );
  // } 

const UserPage: React.FC = ():JSX.Element => {
    // const dispatch = useDispatch;
    // cons user = useSelector((state) => state.user)

    // interface defState {
      
    // }
    const [userName, setUserName] = useState('');
    const [userSurName, setUserSurName] = useState('');
    const [userLogin, setUserLogin] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userDob, setUserDob] = useState('');

    const stateName = useAppSelector((state) => state.user.user.name)
    const stateSurName = useAppSelector((state) => state.user.user.surname)
    const stateLogin = useAppSelector((state) => state.user.user.login)
    const  stateDob = useAppSelector((state) => state.user.user.dob)
    const  stateEmail = useAppSelector((state) => state.user.user.email)

    const dispatch = useDispatch();


    const userInfo: React.FormEventHandler<HTMLFormElement> = (event) => {
      event.preventDefault();
      console.log('event', event);
      const parseDate = new Date(userDob);
  
      const user: IUser = {
        name: userName,
        surname: userSurName,
        login: userLogin,
        password: userPassword,
        dob: parseDate,
        email: stateEmail,
      };
      dispatch(updateUser(user));
    };

  return (

  <Main >
    <div className={styles.user_update_information_main_wrapper}>
    <div className={styles.default_user_info_wrapper}>
      <div className={styles.user_avatar}>
        <img src={userAvatar} className={styles.circle_avatar} alt='User Avatar'></img>
      </div>
      <div className={styles.def_string_info}>
        <h6>Name:</h6><p>{stateName}</p>
      </div>

      <div className={styles.def_string_info}>
        <h6>Last Name:</h6><p>{stateSurName}</p>
      </div>

      <div className={styles.def_string_info}>
        <h6>Login:</h6><p>{stateLogin}</p>
      </div>

      <div className={styles.def_string_info}>
        <h6>Date of born:</h6><p>{stateDob}</p>
      </div>

      <div className={styles.link_change_email}>
        <a href="/email">Change Email@adress</a>
      </div>
      {/* <button onSubmit={(deleteUsers)} className={styles.del_user_button}>DELETE USER</button> */}
      {/* <span onClick={() => deleteUsers({email, })} className={styles.del_user_button}>DELETE USER</span> */}
    </div>

    <div className={styles.change_user_info_wrapper}>
      {/* <form className={styles.form} onSubmit={userInfo}> */}
      <form className={styles.form} onSubmit={userInfo}>
          <h1>Change user information</h1>
        <input onChange={(e) => setUserName(e.target.value)} name='name' defaultValue={stateName} type="text" placeholder='Enter your Name'/>
        <input onChange={(e) => setUserSurName(e.target.value)} name='surname' defaultValue={stateSurName} type="text"  placeholder='Enter your Last Name'/>
        <input onChange={(e) => setUserLogin(e.target.value)} name='login' defaultValue={stateLogin} type="text"  placeholder='Enter your Login'/>
        {/* <input name='oldPassword' type="password" placeholder='Enter your Old password'/>
        <input name='newPassword' type="password" placeholder='Enter your New password'/> */}
        <input onChange={(e) => setUserPassword(e.target.value)} name='newPasswordControl' type="password" placeholder='New password'/>
        <input onChange={(e) => setUserDob(e.target.value)} name='dob' type="date" placeholder='Enter your Date of Born'/>
        <button type="submit" className={styles.registrationButton}>upadte information</button>
      </form>
    </div>
    </div>
  </Main>
);
};

export default UserPage;