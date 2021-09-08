import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

import { ITask } from '../../../types/types';
import styles from '../boardSpace.module.scss';
import deleteTaskButton from '../../../icon/close.png';
import descriptionTaskButton from '../../../icon/description.png';
import { deleteTask } from '../../../store/boardReducer/boardThunk';
import DescriptionTask from '../DescriptionTask/DescriptionTaskModal'

interface Props {
  task:ITask,
  taskIndex: number,
  columnIndex: number
}

const TaskItem: React.FC<Props> = ({task, taskIndex, columnIndex}) => {

  const dispatch = useDispatch();
  const [visionDescription, setVisionDescription] = useState(false);

 
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
      <p>
      {task.title}
      </p>
    <div className={styles.description_button_wrapper}>
    <a onClick={() => setVisionDescription(true)}>
        <img src={descriptionTaskButton} className={styles.description_task_button} alt='delete'></img>
      </a>
    </div>
    <div className={styles.delete_button_wrapper}>
      <a onClick={() => deleteOneTask(task.id)}>
        <img src={deleteTaskButton} className={styles.delete_task_button} alt='delete'></img>
      </a>
    </div>
    {visionDescription && <DescriptionTask
            setVisionDescription = {setVisionDescription}
            taskId={task.id}
            taskIndex={taskIndex}
            columnIndex={columnIndex}
            taskDescriptionValue={task.description}
            taskTitleValue={task.title}
          />}
  </div>

  )
}

export default TaskItem
