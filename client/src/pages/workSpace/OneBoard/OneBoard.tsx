import { useState } from "react";

import styles from '../workSpace.module.scss';

import closeButton from '../../../icon/delete_red.png';
import sendButton from '../../../icon/send_white.png';
import baseAvatar from '../../../image/baseAvatar/baseAvatar.jpeg';

import { IBoard, IColumn } from "../../../types/types";
import { useDispatch } from "react-redux";
import { deleteBoard, getAllColumns, updateBoard } from "../../../store/boardReducer/boardThunk";
import { useHistory } from "react-router";
import { BOARD_WINDOW } from "../../../api/const/const";
import { useAppSelector } from "../../../store/reducers";
import { baseURL } from "../../../api";
import { format } from 'date-fns';
import UserList from "../UserList/UserList";


interface Props {
  index: number,
  boardItem: IBoard,
}

const OneBoard: React.FC<Props> = ({ index, boardItem }) => {

  const dispatch = useDispatch();
  let history = useHistory();

  const [titleBoardChange, setTitleBoardChange] = useState(boardItem.title);
  const [userListVive, setUserListVive] = useState(false);
  const userState = useAppSelector((state) => state.user.user)
  const image = useAppSelector((state) => state.user.user.Image)
  const boardImagePath = boardItem.userPathImage
  const urlAvatar = !image ? baseAvatar : baseURL + '/' + boardImagePath;
  //@ts-ignore
  const trueDateFormat = format(new Date(boardItem.updatedAt), 'MM/dd/yyyy')



  const boardUpdate = (event: React.FormEvent<HTMLFormElement>) => {

    const board: IBoard = {
      title: titleBoardChange,
      id: boardItem.id,
      userId: boardItem.userId,
      userLogin: userState.login,
      userPathImage: userState.Image?.pathImages,
    };
    dispatch(updateBoard(board));
    event.preventDefault();
  };

  const deleteOneBoard = (id: number) => {
    const board: IBoard = {
      id: boardItem.id,
      title: boardItem.title,
      userId: boardItem.userId,
      userLogin: userState.login,
      userPathImage: userState.Image?.pathImages,
    };
    dispatch(deleteBoard(board));
  }

  const getAllColumnsClick = (id: number) => {
    const column: IColumn = {
      id,
      Tasks: [],
      position: 0,
    };
    dispatch(getAllColumns(column));
    history.push(BOARD_WINDOW.replace(':id', `${column?.id}`))
  }

  return (

    <div className={styles.board} key={index}>
      <div className={styles.close_button_wrapper}>
        <button className={styles.close_button} onClick={() => deleteOneBoard(boardItem.id)}>
          <img src={closeButton} className={styles.close_button_img} alt='delete'></img>
        </button>
        <button className={styles.close_button} onClick={() => setUserListVive(true)}>
          <img src={sendButton} className={styles.close_button_img} alt='send'></img>
        </button>
      </div>

      <div
        className={styles.one_board_wrapper}
        onClick={() => getAllColumnsClick(boardItem.id)}>

      </div>

      <div className={styles.board_title_input_wrapper}>
        <form onSubmit={boardUpdate} className={styles.board_title_input_form}>
          <input
            className={styles.border_update_input}
            onChange={(e) => setTitleBoardChange(e.target.value)}
            name='boardChange' required
            value={titleBoardChange}
            type="text"
            placeholder='New board'
          />
        </form >
      </div>
      <div className={styles.user_info_mini_wrapper}>
        <div className={styles.user_info_left_wrapper}>
          <h5>{trueDateFormat}</h5>
        </div>

        <div className={styles.user_info_right_wrapper}>
          <div className={styles.user_wrapper}>
            <div className={styles.user_avatar_mini}>
              <img src={urlAvatar} className={styles.circle_avatar} alt='User Avatar'></img>
            </div>
            <h6>{boardItem.userLogin}</h6>
          </div>
        </div>

      </div>

      {userListVive && <UserList
        activeBoard={boardItem}
        setUserListVive={setUserListVive}
      />}
    </div>
  )

}

export default OneBoard