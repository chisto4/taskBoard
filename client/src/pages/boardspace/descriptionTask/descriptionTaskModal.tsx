import React, { useState } from 'react';

import styles from './descriptionTaskModal.module.scss';
import deleteTaskButton from '../../../icon/close.png';
import { ITask } from '../../../types/types';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../../store/boardReducer/boardThunk';
import { useAppSelector } from '../../../store/reducers';


interface Props {
  setVisionDescription: React.Dispatch<React.SetStateAction<boolean>>,
  taskId?: number,
  taskDescriptionValue?: string,
  taskTitleValue?: string,
  taskIndex: number,
  columnIndex: number,
  taskPriority: number
}

const DescriptionTask: React.FC<Props> = ({ setVisionDescription, taskId, taskIndex,
  columnIndex, taskDescriptionValue, taskTitleValue, taskPriority}) => {

    const taskPriorityFromStateGreen = () => {
      if(taskPriority === 2){
        const priorityStateTask = false
        return priorityStateTask
      } else{
        const priorityStateTask = true
        return priorityStateTask
      }
      }
    const taskPriorityFromStateRed = () => {
      if(taskPriority === 1){
        const priorityStateTask = false
        return priorityStateTask
      } else{
        const priorityStateTask = true
        return priorityStateTask
      }
      }
  
  const dispatch = useDispatch();

  const [taskDescription, setTaskDescription] = useState(taskDescriptionValue);
  const [taskTitle, setTaskTitle] = useState(taskTitleValue);

  const [taskPriorityStateRed, setTaskPriorityRed] = useState(taskPriorityFromStateRed());
  const [taskPriorityStateGreen, setTaskPriorityGreen] = useState(taskPriorityFromStateGreen());

  const updateDescription = (event: React.FormEvent<HTMLFormElement>, taskId?: number) => {

    const booleanToNumber = () => { 
      if(taskPriorityStateGreen){ 
        setTaskPriorityRed(false)
       const priorityNumber: number = 2;
       return priorityNumber;

      } else if(taskPriorityStateRed){
        setTaskPriorityGreen(false)
        const priorityNumber: number = 1;
        return priorityNumber;
      }
    }
    const task: ITask = {
      id: taskId,
      description: taskDescription,
      title: taskTitle,
      priority: booleanToNumber()
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
      <div className={styles.input_task_priority}>

         {taskPriorityFromStateRed() && <p>Priority<input type="checkbox" 
          className={styles.input_checkBox_Red}
          onChange={(e) => setTaskPriorityRed(e.target.checked)} 
          name="redCheck" 
          />RED</p>}

          {taskPriorityFromStateGreen() && <p><input type="checkbox" 
          className={styles.input_checkBox_Red}
          onChange={(e) => setTaskPriorityGreen(e.target.checked)} 
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
        <a onClick={() => setVisionDescription(false)}>
          <img src={deleteTaskButton} className={styles.close_description_button} alt='close'></img>
        </a>
      </div>

    </div>
  )
}
export default DescriptionTask


