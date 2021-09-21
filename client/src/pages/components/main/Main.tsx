import React, { ReactNode } from 'react';

import styles from './mainStyle.module.scss';

type Props = {
  children?: ReactNode | undefined;
}

const Main: React.FC<Props> = (props) => {

  return (
    <main className={styles.main}>
      {props.children}
    </main>
  );
}

export default Main;
