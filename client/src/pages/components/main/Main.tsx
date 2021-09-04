import styles from './mainStyle.module.scss';

import React, { ReactNode} from 'react';

type Props = {
  children?: ReactNode | undefined;
}

const Main: React.FC<Props> = (props) =>{

  return (
  <main className={styles.main}>
    {/* {state.map(item => <h1 key={item.id}>{item.name}</h1>)} */}
    {props.children}
  </main>
    );
}

export default Main;
