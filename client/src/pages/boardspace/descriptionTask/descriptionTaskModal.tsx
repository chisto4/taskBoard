import React, { useState } from 'react';

import styles from './descriptionTaskModal.module.scss';
import deleteTaskButton from '../../../icon/close.png';
import { ITask } from '../../../types/types';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../../store/boardReducer/boardThunk';


interface Props {
  setVisionDescription: React.Dispatch<React.SetStateAction<boolean>>,
  taskId?: number,
  taskDescriptionValue?: string,
  taskTitleValue?: string,
  taskIndex: number,
  columnIndex: number
}

const DescriptionTask: React.FC<Props> = ({ setVisionDescription, taskId, taskIndex,
  columnIndex, taskDescriptionValue, taskTitleValue}) => {

  const dispatch = useDispatch();

  const [taskDescription, setTaskDescription] = useState(taskDescriptionValue);
  const [taskTitle, setTaskTitle] = useState(taskTitleValue);
  const updateDescription = (event: React.FormEvent<HTMLFormElement>, taskId?: number) => {
    const task: ITask = {
      id: taskId,
      description: taskDescription,
      title: taskTitle
    }
    dispatch(updateTask( task, columnIndex, taskIndex ))
    setVisionDescription(false)
    event.preventDefault();
  }

  return (
    <div className={styles.description_wrapper}>
      <form
        onSubmit={(e) => updateDescription(e, taskId)}
        className={styles.description_form}>
      <h4>Change title name</h4>
      <input
        className={styles.input_task_title}
        onChange={(e) => setTaskTitle(e.target.value)}
        defaultValue={taskTitleValue}
      ></input>
            <h6>Description</h6>

         <textarea
          className={styles.input_description}
          onChange={(e) => setTaskDescription(e.target.value)}
          defaultValue={taskDescriptionValue}
        ></textarea>
        <button type="submit" className={styles.save_description_button}>SAVE</button>
      </form>

      <div className={styles.close_button_wrapper}>
        <a
          onClick={() => setVisionDescription(false)}
        >
          <img src={deleteTaskButton} className={styles.close_description_button} alt='close'></img>
        </a>
      </div>

    </div>
  )
}
export default DescriptionTask


