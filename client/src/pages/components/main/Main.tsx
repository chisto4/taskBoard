import React, { ReactNode, useState } from 'react';

import styles from './mainStyle.module.scss';
import blacWhiteButton from '../../../icon/daynight.png';

type Props = {
  children?: ReactNode | undefined;
}

const Main: React.FC<Props> = (props) => {

  const [themeStyle, setThemeStyle] = useState(false)

  const changeTheme = () => {
    if (themeStyle === true) {
      setThemeStyle(false)
    } else {
      setThemeStyle(true)
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.color_theme_wrapper}>
        <button onClick={() => changeTheme()}>
          <img src={blacWhiteButton} className={styles.light_style_button} alt='color_theme'></img>
        </button>
      </div>
      {props.children}
    </main>
  );
}

export default Main;
