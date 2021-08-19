import styles from './helloWindow.module.scss';
import Main from '../../main/Main';

import welcomwScreenImage from '../../../image/welcomePageScreen.png';

const helloWindow = () => {
  return (
    <Main>
    <div className={styles.Hello_window}>
      <div className={styles.Welcome_text_wrapper}>

        <h1>HELLO</h1>

        <h2>Welcome to Task Board</h2>

        <h3>If you want use full function, please Registration now</h3>

      </div>

        <img className={styles.welcome_img} src={welcomwScreenImage} alt={"logo"}/>

    </div>
    </Main>
)}

export default helloWindow;
