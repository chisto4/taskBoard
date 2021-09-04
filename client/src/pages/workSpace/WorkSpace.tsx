import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import styles from './workSpace.module.scss';
import closeButton from '../../icon/close.png';


import Main from '../components/main/Main';
import { useAppSelector } from '../../store/reducers';
import { IBoard } from '../../types/types';
import { useDispatch } from 'react-redux';
import { creatBoard, deleteBoard, getAllBoards } from '../../store/boardReducer/boardThunk';
import { BOARD_WINDOW } from '../../api/const/const';

const WorkSpace = () => {

  const dispatch = useDispatch();
  let history = useHistory();


  const userBoardArray = useAppSelector((state) => state.board.board)
  const [titleBoard, setTitleBoard] = useState('');


  const boardInfo = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('event', event);

    const board: IBoard = {
      title: titleBoard,
    };
    console.log('send', board);

    dispatch(creatBoard(board));
    setTitleBoard("");
    event.preventDefault();
   };

   const deleteOneBoard = (id: number | undefined) => {
    const board: IBoard = {
      id: id,
    };
    console.log('BOARD ID',board)
    dispatch(deleteBoard(board));
   }

  useEffect(() => {
    dispatch(getAllBoards());
  }, [dispatch])

  return (
    <Main>
      <div className={styles.workSpace}>
        <div className={styles.header_input_wrapper}>
          <form onSubmit={boardInfo} className={styles.header_input_form}>
            <input
              onChange={(e) => setTitleBoard(e.target.value)}
              name='board' required
              // defaultValue="New Board" 
              value={titleBoard}
              type="text"
              placeholder='New board'
            />
            <button type="submit" className={styles.create_button}>CREATE</button>
          </form >
        </div>

        <div className={styles.board_wrapper}
        // onClick={() => { history.push("/user") }}
        >
          {userBoardArray.map(board => <div className={styles.board}>
            <div className={styles.close_button_wrapper}>
              <a onClick={() => deleteOneBoard(board.id)}>
                <img src={closeButton} className={styles.close_button} alt='delete'></img>
              </a>
            </div>
            <p className={styles.board__title}
              onClick={() => { history.push(BOARD_WINDOW) }}
            >
              {board.title}
              </p>
          </div>
          )}
        </div>
      </div>
    </Main>
  );
};

export default WorkSpace;