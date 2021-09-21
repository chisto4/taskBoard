import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from 'react';

import styles from './workSpace.module.scss';

import Main from '../components/Main/Main';
import { IBoard } from '../../types/types';
import { useAppSelector } from '../../store/reducers';
import { clearAllColumns, creatBoard, getAllBoards } from '../../store/boardReducer/boardThunk';
import OneBoard from './OneBoard/OneBoard';

import { WORK_SPACE } from '../../api/const/const';
import closeButton from '../../icon/close_white.png';
import { actionsSetError } from '../../store/userReducer/actionUser';


const WorkSpace = () => {

  const dispatch = useDispatch();
  let history = useHistory();


  const userBoardArray = useAppSelector((state) => state.board.board)
  const userState = useAppSelector((state) => state.user.user)
  const errorStatus = useAppSelector((state) => state.user.error)

  const [titleBoard, setTitleBoard] = useState('');

  const boardInfo = (event: React.FormEvent<HTMLFormElement>) => {

    const board: IBoard = {
      title: titleBoard,
      id: 0,
      //@ts-ignore
      userId: userState.id,
      userLogin: userState.login,
      userPathImage: userState.Image?.pathImages,
    };

    dispatch(creatBoard(board));
    setTitleBoard("");
    event.preventDefault();
  };

  const [modalMessage, setModalMessage] = useState<string | null>('');
  const clearError = () => {
    setModalMessage('')
    dispatch(actionsSetError(null));
  }

  useEffect(() => {
    if (errorStatus) history.push(WORK_SPACE)
    dispatch(getAllBoards());
    dispatch(clearAllColumns());
    if (errorStatus) setModalMessage(errorStatus)
  }, [dispatch, errorStatus, history]);

  return (
    <Main>

      {modalMessage && <div className={styles.modal_Inform_Window}>
        <div className={styles.modal_Inform_Window_h4}>
          <h6>{modalMessage}</h6>
        </div>
        <div className={styles.modal_Inform_Window_link}>
          <button className={styles.close_button_wrapper_modal} onClick={() => clearError()}>
            <img src={closeButton} className={styles.close_button_modal} alt='User Avatar'></img>
          </button>
        </div>
      </div>}

      <div className={styles.workSpace}>
        <div className={styles.header_input_wrapper}>
          <form onSubmit={boardInfo} className={styles.header_input_form}>
            <input
              onChange={(e) => setTitleBoard(e.target.value)}
              name='board' required
              value={titleBoard}
              type="text"
              placeholder='New board'
            />
            <button type="submit" className={styles.create_button}>CREATE</button>
          </form >
        </div>

        <div className={styles.board_wrapper}
        >
          {userBoardArray.map((board, index) =>
            <OneBoard
              boardItem={board}
              index={index}
              key={index}
            />
          )}
        </div>
      </div>
    </Main>
  );
};

export default WorkSpace;