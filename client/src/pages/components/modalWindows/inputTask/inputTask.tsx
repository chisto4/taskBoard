import React, { useState } from 'react';
import './inputTask.model.scss';
import closeButton from '../../../../icon/close.png'

interface IUserLoginForm {
  onClickLog: () => void;
  // id: number;
  // login: string;
  // email: string;
  // password: string;
}

const [userDescription, setUserDescription] = useState('');

const InputTask: React.FC<IUserLoginForm> = ({onClickLog}) => {

  const submitUserImg = (e: React.FormEvent<HTMLFormElement>) => {
    // const formData = new FormData();
    e.preventDefault();
    // formData.append('file', userAvatar);
    // console.log("FORM DATA DLYA DIMY", formData)
    // dispatch(uploadUserAvatar(formData));
    // setUserAvatar('')
    // setMoadlMessage(uploadAvatar)
  };

  return (
    <>
      <form onSubmit={(e) => submitUserImg(e)}
            className={styles.avatar_form}>
        <h1>Header text</h1>
        <button onClick={onClickLog} className="closeButton" >
          <img src={closeButton} className="icon" alt="closeButton" />
        </button>
        <textarea name="description" disabled>

        </textarea>
        <input name='description' type="text" placeholder='Enter description task' />
        <button type="submit" className="loginButton">save</button>
      </form>
    </>
  );
}

export default InputTask;
