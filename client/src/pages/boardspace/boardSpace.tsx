import React, { useState } from 'react';
import styles from './boardSpace.module.scss';
import deleteButton from '../../icon/deleteAll.png';
import deleteTaskButton from '../../icon/close.png';

import Main from '../components/main/Main';
import DescriptionTask from './DescriptionTask/DescriptionTaskModal'
import { useAppSelector } from '../../store/reducers';
import { IColumn, ITask } from '../../types/types';
import { useLocation, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { creatColumn, creatTask, deleteColumn, deleteTask, getAllTasks } from '../../store/boardReducer/boardThunk';
import Boarditem from './BoardItem/BoardItem';

const BoardSpace = () => {
  // const location = useLocation()
  //@ts-ignore
  const { id } = useParams()
  const useBoardId = useParams()
  //@ts-ignore
  const boardIdNumber = +useBoardId.id

  const dispatch = useDispatch();

  const userColumnArray = useAppSelector((state) => state.board.column)
  const userTaskArray = useAppSelector((state) => state.board.task)
  const activeBoard = useAppSelector((state) => state.board.clickBoardId)

  const [titleColumn, setTitleColumn] = useState('');
  const [positionColumn, setPositionColumn] = useState(null);

  const [visionDescription, setVisionDescription] = useState(false);


  const craetNewColumnForm = (event: React.FormEvent<HTMLFormElement>) => {
    const column: IColumn = {
      title: titleColumn,
      position: positionColumn,
      boardId: boardIdNumber,
    }
    dispatch(creatColumn(column));
    setTitleColumn("");
    event.preventDefault();
  }

  const getAllTask = (id: number | undefined) => {
    const task: ITask = {
      id: id
    };
    dispatch(getAllTasks(task))
  }

  return (
    <Main>
      <div className={styles.columnSpace}>
        <div className={styles.new_column_input_wrapper}>
          <form onSubmit={craetNewColumnForm} className={styles.header_input_form}>
            <input
              onChange={(e) => setTitleColumn(e.target.value)}
              name='board' required
              // defaultValue="New Board" 
              value={titleColumn}
              type="text"
              placeholder='New column'
            />
            <button type="submit" className={styles.create_button}>CREATE</button>
          </form >
        </div>
      </div>
      <Boarditem  />
      {visionDescription && <DescriptionTask 
        // visionDescription = {visionDescription}
      />}
      
    </Main>
  );
};

export default BoardSpace;