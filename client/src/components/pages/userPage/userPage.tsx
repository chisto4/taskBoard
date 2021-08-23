import Main from "../../main/Main";
// import {useDispatch, useSelector} from "react-redux";
// import { FormEvent } from 'react';

import styles from './userPage.module.scss';
import userAvatar from '../../../image/georgeMaichael.jpeg';
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
  return (

  <Main >
    <div className={styles.user_update_information_main_wrapper}>
    <div className={styles.default_user_info_wrapper}>
      <div className={styles.user_avatar}>
        <img src={userAvatar} className={styles.circle_avatar} alt='User Avatar'></img>
      </div>
      <div className={styles.def_string_info}>
        <h6>Name:</h6><p>Nikolas</p>
      </div>

      <div className={styles.def_string_info}>
        <h6>Last Name:</h6><p>Chistofor</p>
      </div>

      <div className={styles.def_string_info}>
        <h6>Login:</h6><p>Chisto4</p>
      </div>

      <div className={styles.def_string_info}>
        <h6>Date of born:</h6><p>23/08/1991</p>
      </div>

      <div className={styles.link_change_email}>
        <a href="/email">Change Email@adress</a>
      </div>
      {/* <button onSubmit={(deleteUsers)} className={styles.del_user_button}>DELETE USER</button> */}
      {/* <span onClick={() => deleteUsers({email, })} className={styles.del_user_button}>DELETE USER</span> */}
    </div>

    <div className={styles.change_user_info_wrapper}>
      {/* <form className={styles.form} onSubmit={userInfo}> */}
      <form className={styles.form}>
          <h1>Change user information</h1>
        <input name='name' type="text" placeholder='Enter your Name'/>
        <input name='surname' type="text"  placeholder='Enter your Last Name'/>
        <input name='login' type="text"  placeholder='Enter your Login'/>
        <input name='oldPassword' type="password" placeholder='Enter your Old password'/>
        <input name='newPassword' type="password" placeholder='Enter your New password'/>
        <input name='newPasswordControl' type="password" placeholder='Confirm the password'/>
        <input name='dob' type="date" placeholder='Enter your Date of Born'/>
        <button type="submit" className={styles.registrationButton}>upadte information</button>
      </form>
    </div>
    </div>
  </Main>
);
};

export default UserPage;