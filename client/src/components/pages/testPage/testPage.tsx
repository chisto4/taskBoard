import React, { useEffect } from "react";

import styles from './testPage.module.scss'

import Main from "../../main/Main";
import { useTypedSelector } from "../../Redux/types/useTypeSelector";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../Redux/action-creater/users";

const UserList: React.FC =() => {
  const {users, error, loading} = useTypedSelector(state => state.users)
  // console.log('test redux state', state.users)

  const dispatch = useDispatch()
    useEffect( () => {
      dispatch(getAllUsers())
}, [])

  if(loading) {
    return <h1>Please wait - loading Now</h1>
  }
  if(error){
    return <h1>{error}</h1>
  }
  return (
    <Main>
      <div className={styles.test_page_wrapper}>
        <div className={styles.test_content_wrapper}>
          <div className={styles.test_content}>
            {users.map(user => 
            <div>{user.name}</div>
            )}
          </div>
        </div>
      </div>
    </Main>
  )
}

export default UserList;