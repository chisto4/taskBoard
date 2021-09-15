import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';


import { ITask } from '../../../types/types';
import styles from '../boardSpace.module.scss';
import deleteTaskButton from '../../../icon/close_white.png';
import descriptionTaskButton from '../../../icon/description.png';
import { deleteTask } from '../../../store/boardReducer/boardThunk';
import DescriptionTask from '../DescriptionTask/DescriptionTaskModal'
import { useAppSelector } from '../../../store/reducers';
import { baseURL } from '../../../api';
import baseAvatar from '../../../image/wtf.jpeg';


interface Props {
  task: ITask,
  taskIndex: number,
  columnIndex: number
}

const TaskItem: React.FC<Props> = ({ task, taskIndex, columnIndex }) => {

  const dispatch = useDispatch();
  const [visionDescription, setVisionDescription] = useState(false);

  const image = useAppSelector((state) => state.user.user.Image)
  const urlAvatar = !image ? baseAvatar : baseURL + '/' + image?.pathImages;


  const deleteOneTask = (id: number | undefined, columnId: number, position: number) => {
    const taskDel: ITask = {
      id: id,
      priority: 2,
      position: position,
      columnId: columnId
    };
    dispatch(deleteTask(taskDel));
  }

  return (
    <Draggable key={task.id} draggableId={`${task.id}`} index={taskIndex}>
      {(provided) => (
        <div className={styles.task_style}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={{ ...provided.draggableProps.style }}
        >
          {(task.priority === 1) ?
            <div className={styles.color_priority_red}></div>
            : <div className={styles.color_priority_green}></div>}
          <p>
            {task.title}
          </p>

          <div className={styles.user_avatar_mini}>
            <img src={urlAvatar} className={styles.circle_avatar} alt='User Avatar'></img>
          </div>
          
          <div className={styles.one_task_button_wrapper}>

          <div className={styles.description_button_wrapper}>
            <button className={styles.description_circle_button_wrapper} onClick={() => setVisionDescription(true)}>
              <div className={styles.one_circle}></div>
              <div className={styles.one_circle}></div>
              <div className={styles.one_circle}></div>
            </button>
          </div>

          <div className={styles.delete_button_wrapper}>
            <button className={styles.delete_button_wrapper} onClick={() => deleteOneTask(task.id, task.columnId, task.position)}>
              <img src={deleteTaskButton} className={styles.delete_task_button} alt='delete'></img>
            </button>
          </div>
          
          </div>

          {visionDescription && <DescriptionTask
            setVisionDescription={setVisionDescription}
            taskId={task.id}
            taskIndex={taskIndex}
            columnIndex={columnIndex}
            taskDescriptionValue={task.description}
            taskPriority={task.priority}
            taskTitleValue={task.title}
          />}
        </div>
      )}
    </Draggable >
  )
}

export default TaskItem
