import React from 'react'
import { useDispatch } from 'react-redux';

import { ITask } from '../../../types/types';
import styles from '../boardSpace.module.scss';
import deleteTaskButton from '../../../icon/close.png';
import { deleteTask } from '../../../store/boardReducer/boardThunk';

interface Props {
  task:ITask
}

const TaskItem: React.FC<Props> = ({task}) => {

  const dispatch = useDispatch();

  const deleteOneTask = (id: number | undefined) => {
    const task: ITask = {
      id: id,
    };
    console.log('BdfgsdgsD ID', task)
    dispatch(deleteTask(task));
  }

  return(
    <div
    className={styles.task_style}
    draggable={true}
    >
    {task.title}

    <div className={styles.close_button_wrapper}>
      <a onClick={() => deleteOneTask(task.id)}>
        <img src={deleteTaskButton} className={styles.delete_task_button} alt='delete'></img>
      </a>
    </div>
  </div>
  )
}

export default TaskItem
