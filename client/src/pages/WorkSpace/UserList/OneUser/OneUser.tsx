import { useDispatch, useSelector } from 'react-redux';
import { baseURL } from '../../../../api';
import { IBoard, IUser } from '../../../../types/types';
import styles from './oneUser.module.scss';
import baseAvatar from '../../../../image/baseAvatar/baseAvatar.jpeg';
import sendButton from '../../../../icon/send_white.png';
import { useAppSelector } from '../../../../store/reducers';
import { sendBoard } from '../../../../store/boardReducer/boardThunk';


interface Props {
  oneUser: IUser,
  activeBoard: IBoard,
  index: number,
}

const OneUser : React.FC<Props> = ({ oneUser, activeBoard }) => {

  const image = useAppSelector((state) => state.user.usersList.find(item => item.id === oneUser.id))
  const userPathImage = image?.Image
  const urlAvatar = !userPathImage ? baseAvatar : baseURL + '/' + userPathImage?.pathImages;
  console.log('GETING PATH IMAGE', userPathImage)

  const dispatch = useDispatch();

  // const dispatch = useDispatch();
  // const userState = useAppSelector((state) => state.user.user)
  // const allUsersArray = useAppSelector((state) => state.user.usersList)

  const sendOneBoard =()=>{
    const boardForSend = {
      boardId: activeBoard.id,
      userId: oneUser.id
    }
    dispatch(sendBoard(boardForSend))
  }

  return(
    <div className={styles.one_user_wrapper}>

    <div className={styles.one_user_info}>
      <h6>{oneUser.name}</h6>
      <h6>{oneUser.surname}</h6>
      <h5>@{oneUser.login}</h5>
    </div>

        <div className={styles.user_avatar_mini}>
          <img src={urlAvatar} className={styles.circle_avatar} alt='User Avatar'></img>
        </div>

      <button className={styles.send_board_button} onClick={() => sendOneBoard()}>
        <img src={sendButton} className={styles.close_button_img} alt='delete'></img>
      </button>

    </div>
  )
}

export default OneUser