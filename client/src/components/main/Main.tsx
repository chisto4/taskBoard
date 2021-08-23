import styles from './mainStyle.module.scss';

import React, { ReactNode} from 'react';
// import React, { ReactNode, useEffect, useState} from 'react';
// import axios from '../api';

type Props = {
  children?: ReactNode | undefined;
}

// type UsersType = {
//   dob: string;
//   email: string;
//   id: number;
//   login: string;
//   name: string;
//   surname: string;
//   token: string;
// }

const Main: React.FC<Props> = (props) =>{
  // const [state, setState] = useState<UsersType[]>([]);

  
  // useEffect(() => {
  //   console.log('Main')
  //   axios.get('user')
  //     .then(r => {
  //       console.log('result', r.data)
  //       setState(r.data)
  //     })
  //     .catch(e => console.log('error', e.message))
  // }, []);

  return (
  <main className={styles.main}>
    {/* {state.map(item => <h1 key={item.id}>{item.name}</h1>)} */}
    {props.children}
  </main>
    );
}

export default Main;
