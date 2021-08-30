import Main from "../components/main/Main";
// import {useDispatch, useSelector} from "react-redux";
// import { FormEvent } from 'react';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { baseURL } from '../../api/userApi/index';

import styles from './userPage.module.scss';
import baseAvatar from '../../image/user2.jpg';
import { useAppSelector } from "../../store/reducers";
import { IUser } from "../../types/types";
import { updateUser, updateUserInformationToken, uploadUserAvatar } from "../../store/userReducer/userThunk";
import { useDispatch } from "react-redux";
import { format, compareAsc } from 'date-fns';
import { Card, Form, Button, Figure } from 'react-bootstrap';
import axios from '../../api/userApi/index';

const UserPage: React.FC = (): JSX.Element => {
  const { name: stateName, dob: stateDob, email: stateEmail,
    login: stateLogin, surname: stateSurName, avatarId: stateAvatarId
  } = useAppSelector((state) => state.user.user)

  const thrueDateFormat = format(new Date(stateDob), 'MM/dd/yyyy')
  const dispatch = useDispatch();

  const image = useAppSelector((state) => state.user.user.Image)
  // const imageIdstate = useAppSelector((state) => state.user.user)
  const imageIdstate = useAppSelector((state) => state)
  console.log('tut padaet', image)
  console.log('tut padaet2', imageIdstate)
  const urlAvatar = !image ? baseAvatar : baseURL + '/' + image?.pathImages;
  

  const [userName, setUserName] = useState(stateName);
  const [userSurName, setUserSurName] = useState(stateSurName);
  const [userLogin, setUserLogin] = useState(stateLogin);
  const [userEmail, setUserEmail] = useState(stateEmail);
  const [userPassword, setUserPassword] = useState('');
  const [userDob, setUserDob] = useState(stateDob);
  const [userAvatar, setUserAvatar] = useState<string | Blob>('');;

  const userInfo: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log('event', event);

    const user: IUser = {
      name: userName,
      surname: userSurName,
      login: userLogin,
      password: userPassword,
      dob: userDob,
      email: userEmail,
    };
    console.log('send', user);

    dispatch(updateUser(user));
 };

  const submitUserImg = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData();
    e.preventDefault();
    formData.append('file', userAvatar);
    // console.log("FORM DATA DLYA DIMY", formData)
    dispatch(uploadUserAvatar(formData));
  };

  const setUseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files?.length) {
      const currentAvatar = e.currentTarget.files[0];
      setUserAvatar(currentAvatar);
    }
  };

  return (
    <Main >
      <div className={styles.user_update_information_main_wrapper}>

        <div className={styles.default_user_info_wrapper}>

          <div className={styles.user_avatar}>
            <img src={urlAvatar} className={styles.circle_avatar} alt='User Avatar'></img>
          </div>

          <form
            onSubmit={(e) => submitUserImg(e)}
            className={styles.avatar_form}
          >
            <div className={styles.upload_wrapper}>
              <label htmlFor="inp" className={styles.input_label}>upload avatar</label>
              <input id="inp" className={styles.upload_input_form}
                type="file" name="file"
                onChange={(e) => setUseFile(e)}
              />
            </div>
            <Button
              variant="outline-primary"
              className={styles.input_label}
              as="input" type="submit" value="Load"
              hidden={!userAvatar}
            />
          </form>

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
          {/* USER EMAIL */}
          {/* <div className={styles.link_change_email}>
        <a href="/email">Change Email@adress</a>
      </div> */}
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
            <input onChange={(e) => setUserEmail(e.target.value)} name='email' defaultValue={stateEmail} type="text" placeholder='Enter your Email' />
            {/* <input name='oldPassword' type="password" placeholder='Enter your Old password'/>
        <input name='newPassword' type="password" placeholder='Enter your New password'/> */}
            <input onChange={(e) => setUserPassword(e.target.value)} name='newPasswordControl' required type="password" placeholder='Confirm password' />
            <input onChange={(e) => setUserDob(e.target.value)} name='dob' type="date" placeholder='Enter your Date of Born' />
            <button type="submit" className={styles.registrationButton}>upadte information</button>
          </form>
        </div>
      </div>
    </Main>
  );

};

export default UserPage;