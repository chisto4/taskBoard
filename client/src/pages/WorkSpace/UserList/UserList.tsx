import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from '../../../store/reducers';
import { getAllUserList } from '../../../store/userReducer/userThunk';
import { IBoard, IUserRequest } from '../../../types/types';
import closeButton from '../../../icon/close_white.png';
import OneUser from './OneUser/OneUser';
import styles from './userList.module.scss';

interface Props {
  activeBoard: IBoard,
  setUserListVive: (open: boolean) => void;
}

const UserList: React.FC<Props> = ({ activeBoard, setUserListVive }) => {

  const dispatch = useDispatch();
  const userState = useAppSelector((state) => state.user.user)
  const allUsersArray = useAppSelector((state) => state.user.usersList)

    const user: IUserRequest = {
      id: userState.id,
    }

  useEffect(() => {
    dispatch(getAllUserList(user));
  }, [])

  return(
    <div className={styles.user_list_wrapper}>
      <h3>Send Board to</h3>

      <button className={styles.close_button} onClick={() => setUserListVive(false)}>
        <img src={closeButton} className={styles.close_button_img} alt='delete'></img>
      </button>
      
      <div className={styles.user_list}>
        {allUsersArray.map((user, index) => 
          <OneUser
            oneUser={user}
            index={index}
            key={user.id}
            activeBoard={activeBoard}
          />
        )}
      </div>

    </div>
  )
}

export default UserList