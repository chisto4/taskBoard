import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from 'react';

import styles from './workSpace.module.scss';

import Main from '../components/Main/Main';
import { IBoard, IColumn } from '../../types/types';
import { BOARD_WINDOW } from '../../api/const/const';
import { useAppSelector } from '../../store/reducers';
import { clearAllColumns, creatBoard, deleteBoard,
        getAllBoards, getAllColumns } from '../../store/boardReducer/boardThunk';
import OneBoard from './OneBoard/OneBoard';

const WorkSpace = () => {

  const dispatch = useDispatch();

  const userBoardArray = useAppSelector((state) => state.board.board)
  const stateInfo = useAppSelector((state) => state)
  console.log('STATE INFO', stateInfo)

  const [titleBoard, setTitleBoard] = useState('');

  const boardInfo = (event: React.FormEvent<HTMLFormElement>) => {

    const board: IBoard = {
      title: titleBoard,
      id: 0
    };

    dispatch(creatBoard(board));
    setTitleBoard("");
    event.preventDefault();
  };

  useEffect(() => {
    dispatch(getAllBoards());
    dispatch(clearAllColumns());
  }, [dispatch])

  return (
    <Main>
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
          />
          )}
        </div>
      </div>
    </Main>
  );
};

export default WorkSpace;