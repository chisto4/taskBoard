import React, { ReactNode, useState } from 'react';

import styles from './mainStyle.module.scss';
import style from './mainStyleWhite.module.scss';
import blacWhiteButton from '../../../icon/daynight.png';

type Props = {
  children?: ReactNode | undefined;
}
const theme = localStorage.getItem('theme')

const Main: React.FC<Props> = (props) => {

  const [themeStyle, setThemeStyle] = useState(false)

  const changeTheme = () => {
    themeStyle? setThemeStyle(false) : setThemeStyle(true)
    themeStyle? localStorage.setItem('theme', 'true') : localStorage.removeItem('theme')
  }

  return (
    <main className={theme? styles.main : style.main}>
      <div className={styles.color_theme_wrapper}>
        <button onClick={() => changeTheme()} className={styles.color_theme_button}>
          <img src={blacWhiteButton} className={styles.light_style_button} alt='color_theme'></img>
        </button>
      </div>
      {props.children}
    </main>
  );
}

export default Main;
