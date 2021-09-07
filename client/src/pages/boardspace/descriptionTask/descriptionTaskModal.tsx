import React, { useState } from 'react';

import styles from './descriptionTaskModal.module.scss';
import deleteTaskButton from '../../../icon/close.png';
import { IColumnIndex, ITask, ITaskIndex } from '../../../types/types';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../../store/boardReducer/boardThunk';


interface Props {
  setVisionDescription: React.Dispatch<React.SetStateAction<boolean>>,
  taskId?: number,
  taskDescriptionValue?: string,
  taskIndex: ITaskIndex,
  columnIndex: IColumnIndex
}

const DescriptionTask: React.FC<Props> = ({ setVisionDescription, taskId, taskIndex,
  columnIndex, taskDescriptionValue}) => {

  const dispatch = useDispatch();

  const [taskDescription, setTaskDescription] = useState('');
  const updateDescription = (event: React.FormEvent<HTMLFormElement>, taskId?: number) => {
    const task: ITask = {
      id: taskId,
      description: taskDescription,
    }
            //@ts-ignore
    dispatch(updateTask({ task, taskIndex,  columnIndex}))
    setVisionDescription(false)
    event.preventDefault();
  }

  return (
    <div className={styles.description_wrapper}>
      <h5>Change Task Name</h5>
      <form>
        <input className={styles.input_task_title}></input>
      </form>

      <h6>Description</h6>
      <form
        onSubmit={(e) => updateDescription(e, taskId)}
        className={styles.description_form}>
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


