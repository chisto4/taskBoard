import React, { useState } from 'react';
import styles from './boardSpace.module.scss';
import deleteButton from '../../icon/deleteAll.png';
import deleteTaskButton from '../../icon/close.png';

import Main from '../components/main/Main';
import DescriptionTask from './descriptionTask/descriptionTaskModal'
import { useAppSelector } from '../../store/reducers';
import { IColumn, ITask } from '../../types/types';
import { useLocation, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { creatColumn, creatTask, deleteColumn, deleteTask, getAllTasks } from '../../store/boardReducer/boardThunk';

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
  const [boardIdColumn, setIdColumn] = useState('');

  const [titleTask, setTitleTask] = useState('');
  const [positionTask, setPositionTask] = useState(null);
  const [priorityTask, setPriorityTask] = useState(null);
  const [taskColumnId, setColumnId] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

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

  const craetNewTaskForm = (event: React.FormEvent<HTMLFormElement>, id: number | undefined) => {
    const task: ITask = {
      title: titleTask,
      position: positionTask,
      priority: priorityTask,
      description: taskDescription,
      columnId: id,
    }
    dispatch(creatTask(task));
    setTitleTask("");
    event.preventDefault();
  }

  const deleteOneColumn = (id: number | undefined) => {
    const column: IColumn = {
      id: id,
    };
    console.log('BdfgsdgsD ID', column)
    dispatch(deleteColumn(column));
  }

  const getAllTask = (id: number | undefined) => {
    const task: ITask = {
      id: id
    };
    dispatch(getAllTasks(task))
  }

  const deleteOneTask = (id: number | undefined) => {
    const task: ITask = {
      id: id,
    };
    console.log('BdfgsdgsD ID', task)
    dispatch(deleteTask(task));
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


        <div className={styles.column_wrapper}>

          {userColumnArray.map((column => 
            <div className={styles.column}>
              <div className={styles.column__title}>
                {column.title}
              </div>

              <div className={styles.task_wrapper}>
                {userTaskArray.filter(x => x.columnId === column.id).map(task =>
                  <div
                    className={styles.task}
                    draggable={true}
                  >
                    {task.title}

                    <div className={styles.close_button_wrapper}>
                      <a onClick={() => deleteOneTask(task.id)}>
                        <img src={deleteTaskButton} className={styles.delete_task_button} alt='delete'></img>
                      </a>
                    </div>
                  </div>
                )}

              </div>

              <form
                onSubmit={(e) => craetNewTaskForm(e, column.id)}
                className={styles.new_task_input_form}>
                <input
                  onChange={(e) => setTitleTask(e.target.value)}
                  name='name' required
                  value={titleTask}
                  type="text"
                  placeholder='`New task'
                />
              </form >

              <div className={styles.close_button_wrapper}>
                <a onClick={() => deleteOneColumn(column.id)}>
                  <img src={deleteButton} className={styles.delete_column_button} alt='delete'></img>
                </a>
              </div>

            </div>)
          
          )}
        </div>
      </div>
      {/* <DescriptionTask /> */}
    </Main>
  );
};

export default BoardSpace;