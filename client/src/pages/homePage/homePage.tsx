import Main from '../components/Main/Main';
import styles from './homePage.module.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actionsSetError } from '../../store/userReducer/actionUser';
import Slider from './Slider/Slider';

const HelloWindow = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionsSetError(null))
  }, [dispatch])

  return (
    <Main>
      <div className={styles.Hello_window}>
        <div className={styles.Welcome_text_wrapper}>

          <h1>HELLO</h1>

          <h2>Welcome to Task Board</h2>

          <h3>If you want use full function, please Registration now</h3>

        </div>

        <Slider />

      </div>
    </Main>
  )
}

export default HelloWindow;
