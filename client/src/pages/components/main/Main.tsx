import styles from './mainStyle.module.scss';
import blacWhiteButton from '../../../icon/daynight.png';


import React, { ReactNode, useState} from 'react';

type Props = {
  children?: ReactNode | undefined;
}


const Main: React.FC<Props> = (props) =>{

  const [themeStyle, setThemeStyle] = useState(false)

  const changeTheme = () => {
      if(themeStyle === true){
        setThemeStyle(false)
      } else {
        setThemeStyle(true)
      }
      console.log('theme state', changeTheme)
  }
  // export const styleState = themeStyle;

  return (
  <main className={styles.main}>
      <div className={styles.color_theme_wrapper}>
        <a onClick={() => changeTheme()}>
          <img src={blacWhiteButton} className={styles.light_style_button} alt='color_theme'></img>
        </a>
      </div>

    {/* {state.map(item => <h1 key={item.id}>{item.name}</h1>)} */}
    {props.children}
  </main>
    );
}

export default Main;
