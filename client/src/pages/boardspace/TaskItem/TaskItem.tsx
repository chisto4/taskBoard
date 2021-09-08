import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';


import { ITask } from '../../../types/types';
import styles from '../boardSpace.module.scss';
import deleteTaskButton from '../../../icon/close.png';
import descriptionTaskButton from '../../../icon/description.png';
import { deleteTask } from '../../../store/boardReducer/boardThunk';
import DescriptionTask from '../DescriptionTask/DescriptionTaskModal'

interface Props {
  task: ITask,
  taskIndex: number,
  columnIndex: number
}

const TaskItem: React.FC<Props> = ({ task, taskIndex, columnIndex }) => {

  const dispatch = useDispatch();
  const [visionDescription, setVisionDescription] = useState(false);

  const [currentColumn, setCurrentColumn] = useState(null)
  const [currentTask, setCurrentTask] = useState(null)
  const [currentColumnIndex, setCurentColumnIndex] = useState(null)
  const [currentTaskIndex, setCurentTaskIndex] = useState(null)


  const deleteOneTask = (id: number | undefined) => {
    const task: ITask = {
      id: id,
    };
    console.log('BdfgsdgsD ID', task)
    dispatch(deleteTask(task));
  }

  // const dragStartHeandler = (event, task.id, task.columnId, columnIndex, taskIndex ) => {
  //   setCurrentColumn(task.columnId)
  //   setCurrentTask(task.id)
  //   setCurentColumnIndex(columnIndex)
  //   setCurentTaskIndex(taskIndex)
  //   event.prevent.Default()
  // }

  return (
    <Draggable key={task.id} draggableId={`${task.id}`} index={taskIndex}>
      {(provided, snapshot) => {

        return (
          <div className={styles.task_style}
            // draggable={true}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}

            style={{ ...provided.draggableProps.style }}

          // onDragStart={(event) => dragStartHeandler(event, task.id, task.columnId)}
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
              setVisionDescription={setVisionDescription}
              taskId={task.id}
              taskIndex={taskIndex}
              columnIndex={columnIndex}
              taskDescriptionValue={task.description}
              taskTitleValue={task.title}
            />}
          </div>
        )
      }}
    </Draggable >

  )
}

export default TaskItem
