import React, { useState } from 'react';
import styles from './boardSpace.module.scss';
import deleteButton from '../../icon/deleteAll.png';
import deleteTaskButton from '../../icon/close.png';

import { useEffect } from 'react';

import Main from '../components/main/Main';
import { useAppSelector } from '../../store/reducers';
import { IColumn, ITask } from '../../types/types';
import { useLocation, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { creatColumn, creatTask, deleteColumn, deleteTask, getAllColumns, getAllTasks } from '../../store/boardReducer/boardThunk';
import BoardItem from './BoardItem/BoardItem';

interface IUseParams {
  id: string;
}

const BoardSpace = () => {
  const useBoardId = useParams<IUseParams>()
  const boardIdNumber = Number(useBoardId.id)

  const dispatch = useDispatch();

  const activeBoard = useAppSelector((state) => state.board.clickBoardId)

  const [titleColumn, setTitleColumn] = useState('');
  const [positionColumn, setPositionColumn] = useState(null);



  const craetNewColumnForm = (event: React.FormEvent<HTMLFormElement>) => {
    const column: IColumn = {
      title: titleColumn,
      position: positionColumn,
      boardId: boardIdNumber,
      Tasks: []
    }
    dispatch(creatColumn(column));
    setTitleColumn("");
    event.preventDefault();
  }

  return (
    <Main>
      <div className={styles.columnSpace}>
        <div className={styles.new_column_input_wrapper}>
          <form onSubmit={craetNewColumnForm} className={styles.header_input_form}>
            <input
              onChange={(e) => setTitleColumn(e.target.value)}
              name='board' required
              value={titleColumn}
              type="text"
              placeholder='New column'
            />
            <button type="submit" className={styles.create_button}>CREATE</button>
          </form >
        </div>
      </div>
      <BoardItem />


    </Main>
  );
};

export default BoardSpace;