import Main from "../../main/Main";
import {useSelector} from "react-redux";
import styles from './userPage.module.scss'
import { ReactNode } from "react";
import instance from "../../api";

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
    const res = await instance.post('/user',      
    {
      name: name,
      surname: surname,
      login: login,
      email: email,
      password: password,
      dob: dob
  })
    event.preventDefault();

    return (
        <div className={styles.userRegistrationSucces}>
          User Hes registration
          console.log('registracia rabotaet');
        </div>
    );
  } 

const UserPage: React.FC = () => {
const state = const state = useSelector(state => state.users)
return (

<Main>
<div className={styles.default_user_info_wrapper}>
<div className={styles.def_string_info}>
<h6>Name:</h6>{name}
</div>
<div className={styles.def_string_info}>
<h6>Last Name:</h6>{surname}
</div>
<div className={styles.def_string_info}>
<h6>Login:</h6>{login}
</div>
<div className={styles.def_string_info}>
<h6>Date of born:</h6>{dob}
</div>
<div className={styles.link_change_email}>
<a href="/email">Change Email@adress</a>
</div>
</div>

<div className={styles.change_user_info_wrapper}>
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
</div>
</Main>
);
};

export default UserPage;