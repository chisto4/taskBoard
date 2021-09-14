import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './descriptionTaskModal.module.scss';
import { IUpdateTask } from '../../../types/types';
import deleteTaskButton from '../../../icon/close.png';
import { updateTask } from '../../../store/boardReducer/boardThunk';

interface Props {
  setVisionDescription: React.Dispatch<React.SetStateAction<boolean>>,
  taskId?: number,
  taskIndex: number,
  columnIndex: number,
  taskTitleValue?: string,
  taskDescriptionValue?: string,
  taskPriority: number
}

const DescriptionTask: React.FC<Props> = ({ setVisionDescription, taskId, taskIndex,
  columnIndex, taskDescriptionValue, taskTitleValue, taskPriority }) => {

  const dispatch = useDispatch();

  const [taskTitle, setTaskTitle] = useState(taskTitleValue);
  const [taskDescription, setTaskDescription] = useState(taskDescriptionValue);
  const [taskPriorityState, setTaskPriority] = useState<number>(taskPriority);

  const updateDescription = (event: React.FormEvent<HTMLFormElement>, taskId?: number) => {

    console.log('taskPriorityState', taskPriorityState);
    
    const task: IUpdateTask = {
      id: taskId || 0,
      title: taskTitle,
      priority: taskPriorityState,
      description: taskDescription
    }
    dispatch(updateTask(task, columnIndex, taskIndex))
    setVisionDescription(false)
    event.preventDefault();
  }

  return (
    <div className={styles.description_wrapper}>
      <form
        className={styles.description_form}
        onSubmit={(e) => updateDescription(e, taskId)}
      >
        <h4>Change title name</h4>
        <input
          className={styles.input_task_title}
          onChange={(e) => setTaskTitle(e.target.value)}
          defaultValue={taskTitleValue}
        ></input>
        <div className={styles.input_task_priority}>

          {taskPriority === 2 && <p>Priority<input type="checkbox"
            className={styles.input_checkBox_Red}
            onChange={(e) => setTaskPriority(e.target.checked ? 1 : 2 )}
            name="redCheck"
          />RED</p>}

          {taskPriority === 1 && <p>Priority<input type="checkbox"
            className={styles.input_checkBox_Red}
            onChange={(e) => setTaskPriority(e.target.checked ? 2 : 1)}
            name="greenCheck"
          />GREEN</p>}

        </div>
        <h6>Description</h6>

        <textarea
          className={styles.input_description}
          onChange={(e) => setTaskDescription(e.target.value)}
          defaultValue={taskDescriptionValue}
        ></textarea>
        <button type="submit" className={styles.save_description_button}>SAVE</button>
      </form>

      <div className={styles.close_button_wrapper}>
        <button onClick={() => setVisionDescription(false)}>
          <img src={deleteTaskButton} className={styles.close_description_button} alt='close'></img>
        </button>
      </div>

    </div>
  )
}
export default DescriptionTask


