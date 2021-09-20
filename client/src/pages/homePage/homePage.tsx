import Main from '../components/Main/Main';
import styles from './homePage.module.scss';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
// import 'react-calendar/dist/Calendar.css';
import welcomeScreenImage from '../../image/welcomePageScreen.png';
import Calendar from 'react-calendar';
import { useDispatch } from 'react-redux';
import { actionsSetError } from '../../store/userReducer/actionUser';

const HelloWindow = () => {
  const [value, onChange] = useState(new Date());

const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionsSetError(null))
  },[dispatch])
  
  return (
    <Main>
      <div className={styles.Hello_window}>
        <div className={styles.Welcome_text_wrapper}>

          <h1>HELLO</h1>

          <h2>Welcome to Task Board</h2>

          <h3>If you want use full function, please Registration now</h3>

        </div>

        {/* <img className={styles.welcome_img} src={welcomeScreenImage} alt={"logo"} /> */}

        {/* <Calendar/> */}
        {/* <div>
      <DatePicker
        onChange={onChange}
        value={value}
      />
    </div> */}

<div>
      <Calendar
        onChange={onChange}
        value={value}
      />
    </div>
        

      </div>
    </Main>
  )
}

export default HelloWindow;
