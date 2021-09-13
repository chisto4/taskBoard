import Main from "../components/main/Main";
import React, { useState} from 'react';
import { baseURL } from '../../api/index';

import styles from './userPage.module.scss';
import baseAvatar from '../../image/wtf.jpeg';
import closeButton  from '../../icon/close.png';
import { useAppSelector } from "../../store/reducers";
import { IUser } from "../../types/types";
import { editUsersEmail, updateUser, uploadUserAvatar } from "../../store/userReducer/userThunk";
import { useDispatch } from "react-redux";
import { format } from 'date-fns';
import { Button } from "react-bootstrap";

const UserPage: React.FC = (): JSX.Element => {
  const { name: stateName, dob: stateDob, email: stateEmail,
    login: stateLogin, surname: stateSurName, avatarId: stateAvatarId
  } = useAppSelector((state) => state.user.user)

  const error = useAppSelector((state) => state.user.error)

  const thrueDateFormat = format(new Date(stateDob), 'MM/dd/yyyy')
  const dispatch = useDispatch();

  const image = useAppSelector((state) => state.user.user.Image)
  const imageIdstate = useAppSelector((state) => state)
  const urlAvatar = !image ? baseAvatar : baseURL + '/' + image?.pathImages;
  

  const [userName, setUserName] = useState(stateName);
  const [userSurName, setUserSurName] = useState(stateSurName);
  const [userLogin, setUserLogin] = useState(stateLogin);
  const [userDob, setUserDob] = useState(stateDob);
  
  const [userEmail, setUserEmail] = useState(stateEmail);
  const [userPassword, setUserPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [formSwitch, setFormSwitch] = useState(false);
  const [valuePassword, setValuePassword] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string | Blob>('');;

  const [modalMessage, setModalMessage] = useState('');
    const uploadAvatar = "Your avatar has been update"
    const updaitUserInfo = "Your user information has been update"
    const updaitEmailPassword = "Update success"

  const userInfo: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log('event', event);

    const user: IUser = {
      dob: userDob,
      name: userName,
      email: userEmail,
      login: userLogin,
      surname: userSurName,
      password: userPassword,
    };

    dispatch(updateUser(user));
    setModalMessage(updaitUserInfo)

 };

  const userInfoPassEmail: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log('Password and Email event', event);

    const validNewPassword = (newPassword === confirmPassword);
    if(!validNewPassword){
      setValuePassword(true)
    } else {
      const updatePassword = newPassword
    const user: IUser = {
      name: userName,
      surname: userSurName,
      login: userLogin,
      password: updatePassword,
      dob: userDob,
      email: userEmail,
    };
    console.log('send', user);

    dispatch(editUsersEmail(user));
    setValuePassword(false)
    setModalMessage(updaitEmailPassword)

 }};

  const submitUserImg = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData();
    e.preventDefault();
    formData.append('file', userAvatar);
    dispatch(uploadUserAvatar(formData));
    setUserAvatar('')
    setModalMessage(uploadAvatar)
  };

  const setUseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files?.length) {
      const currentAvatar = e.currentTarget.files[0];
      setUserAvatar(currentAvatar);
    }
  };

  return (
    <Main >

    {modalMessage && <div className={styles.modal_Inform_Window}>
      <div className={styles.modal_Inform_Window_h4}>
        <h4>{modalMessage}test</h4>
      </div>
      <div className={styles.modal_Inform_Window_link}>
      <a onClick={() => setModalMessage('')}>
      <img src={closeButton} className={styles.close_button} alt='close'></img>
      </a>
      </div>
    </div>}

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
        </div>

        <div className={styles.change_user_info_wrapper}>
        {!formSwitch && <h1>Change user information</h1>}
        {formSwitch && <h1>Change E-mail and password</h1>}

          <div className={styles.change_update_form_window}>
            <button className={styles.change_user_form_window_left} onClick={() => setFormSwitch(false)} >USER INFO</button>
            <button className={styles.change_user_form_window_right} onClick={() => setFormSwitch(true)}>EMAIL & PASSWORD</button>
          </div>

          {!formSwitch && <form className={styles.form} onSubmit={userInfo}>
            <input onChange={(e) => setUserName(e.target.value)} name='name' required defaultValue={stateName} type="text" placeholder='Enter your Name' />
            <input onChange={(e) => setUserSurName(e.target.value)} name='surname' required defaultValue={stateSurName} type="text" placeholder='Enter your Last Name' />
            <input onChange={(e) => setUserLogin(e.target.value)} name='login' required defaultValue={stateLogin} type="text" placeholder='Enter your Login' />
            <input onChange={(e) => setUserDob(e.target.value)} name='dob' type="date" placeholder='Enter your Date of Born' />
            <button type="submit" className={styles.registrationButton}>update information</button>
          </form>}

          {formSwitch && <form className={styles.form} onSubmit={userInfoPassEmail}>
            <input onChange={(e) => setUserEmail(e.target.value)} name='email' required defaultValue={stateEmail} type="email" placeholder='Enter New Email' />
            <input onChange={(e) => setUserPassword(e.target.value)} name='Password' required type="password" placeholder='Enter Old Password' />
            <input onChange={(e) => setNewPassword(e.target.value)} name='newPassword' required type="password" placeholder='Enter your New Password' />
            <input onChange={(e) => setConfirmPassword(e.target.value)} name='confirmPassword' required type="password" placeholder='Confirm New Password' />
              {valuePassword && <p className={styles.password_valid_message}>Password mismatch</p>}
            <button type="submit" className={styles.registrationButton}>update email and password</button>
          </form>}
        </div>
      </div>
    </Main>
  );

};

export default UserPage;