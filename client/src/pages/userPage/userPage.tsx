import Main from "../components/main/Main";
// import {useDispatch, useSelector} from "react-redux";
// import { FormEvent } from 'react';
import React, { useState, useRef, useCallback } from 'react';

import styles from './userPage.module.scss';
import userAvatar from '../../image/user2.jpg';
import { useAppSelector } from "../../store/reducers";
import { IUser } from "../../types/types";
import { updateUser } from "../../store/userReducer/userThunk";
import { useDispatch } from "react-redux";
import { format, compareAsc } from 'date-fns';
import { Card, Form, Button, Figure } from 'react-bootstrap';
import axios from '../../api/userApi/index';

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

const UserPage: React.FC = (): JSX.Element => {
  // const dispatch = useDispatch;
  // cons user = useSelector((state) => state.user)

  // interface defState {

  // }


  const { name: stateName, dob: stateDob, email: stateEmail, login: stateLogin, surname: stateSurName } = useAppSelector((state) => state.user.user)
  const thrueDateFormat = format(new Date(stateDob), 'MM/dd/yyyy')

  const [userName, setUserName] = useState(stateName);
  const [userSurName, setUserSurName] = useState(stateSurName);
  const [userLogin, setUserLogin] = useState(stateLogin);
  const [userPassword, setUserPassword] = useState('');
  const [userDob, setUserDob] = useState(stateDob);

  const dispatch = useDispatch();

  const userInfo: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log('event', event);

    const user: IUser = {
      name: userName,
      surname: userSurName,
      login: userLogin,
      password: userPassword,
      dob: userDob,
      email: stateEmail,
    };
    console.log('send', user);

    dispatch(updateUser(user));
  };
  console.log('text', userName);
  const handlerUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  }


  //UPLOAD IMAGE
  // const fileRef = useRef(null);
  // const [ loading, setLoading ] = useState(false);
  // const startUploadSumbit = useCallback( event => {
  //   event.preventDefault();

  //   const fetchData = async (uint8Array: any) => {
  //     try {
  //       const response = await axios({
  //         method: 'post',
  //         url: '/avatar',
  //         data: [...uint8Array] // не отправляем в JSON, размер изображения увеличится
  //       });

  //       setLoading(false);
  //       console.log(response);
  //     } catch (e) {
  //       console.error((e), 'function handleSubmit')
  //     }
  //   };
  //   fetchData(Uint8Array);
  // if(!fileRef.current) return void null;

  // const reader = new FileReader();
  // reader.onloadend = () => {
  //   const uint8Array = new Uint8Array(reader.result);
  //   setLoading(true);
  //   fetchData(uint8Array);
  // };

  // рекомендованный метод
  // reader.readAsArrayBuffer(fileRef.current[0]);

  // метод reader.readAsBinaryString(fileRef.current[0])
  // согласно MDN,
  // уже был однажды удален из File API specification,
  // но после его вернули
  // в использование, но все же рекомендуют
  // использовать readAsArrayBuffer
  // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsBinaryString
  // }, []);


  return (
    <Main >
      <div className={styles.user_update_information_main_wrapper}>
        <div className={styles.default_user_info_wrapper}>
          <div className={styles.user_avatar}>
            <img src={userAvatar} className={styles.circle_avatar} alt='User Avatar'></img>

            {/* <form onSubmit={startUploadSumbit}>
              <div>
                <input
                  onChange={e => e.target.files}
                  accept="image/*"
                  type="file"
                  id="button-file"
                />
              </div>
              <button type="submit">{loading ? 'Сохраняю...' : 'Сохранить'}</button>
          </form> */}

          </div>

          <form
            // onSubmit={(e) => handlerUpload(e)}
            className={styles.avatar_form}
            action="/user"
            method="post"
            encType="multipart/form-data"
          >
            <label>Change your Avatar</label><br />
            <input className={styles.avatar_form_input} type="file" name="filedata" /><br />
            <input className={styles.avatar_form_send_button} type="submit" value="Send" />
          </form>

          {/* <Form>
                        <Form.Group>
                            <Button
                                style={{ marginTop: '10px' }}
                                variant="outline-primary" 
                                className="mt-2"
                                as="input"
                                type="submit"
                                value="Load"
                                size="sm"
                                disabled={!userAvatar}
                            />
                        </Form.Group>
                    </Form> */}
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
            <h6>Date of born:</h6><p>{thrueDateFormat}</p>
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
            <input onChange={(e) => setUserName(e.target.value)} name='name' defaultValue={stateName} type="text" placeholder='Enter your Name' />
            <input onChange={(e) => setUserSurName(e.target.value)} name='surname' defaultValue={stateSurName} type="text" placeholder='Enter your Last Name' />
            <input onChange={(e) => setUserLogin(e.target.value)} name='login' defaultValue={stateLogin} type="text" placeholder='Enter your Login' />
            {/* <input name='oldPassword' type="password" placeholder='Enter your Old password'/>
        <input name='newPassword' type="password" placeholder='Enter your New password'/> */}
            <input onChange={(e) => setUserPassword(e.target.value)} name='newPasswordControl' required type="password" placeholder='New password' />
            <input onChange={(e) => setUserDob(e.target.value)} name='dob' type="date" placeholder='Enter your Date of Born' />
            <button type="submit" className={styles.registrationButton}>upadte information</button>
          </form>
        </div>
      </div>
    </Main>
  );
};

export default UserPage;