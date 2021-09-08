import { useState } from 'react';
import { useDispatch } from 'react-redux';

import {  Droppable } from 'react-beautiful-dnd';

import { creatTask, deleteColumn } from '../../../store/boardReducer/boardThunk';
import { IColumn, ITask } from '../../../types/types';
import styles from '../boardSpace.module.scss';
import TaskList from '../TaskList/TaskList';
import deleteButton from '../../../icon/deleteAll.png';


interface Props {
  column: IColumn;
  columnIndex: number
}

const ColumnItem: React.FC<Props> = ({ column, columnIndex }) => {

  const [titleTask, setTitleTask] = useState('');
  const [positionTask, setPositionTask] = useState(null);
  const [priorityTask, setPriorityTask] = useState(null);
  const [taskColumnId, setColumnId] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const dispatch = useDispatch();

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
      Tasks: []
    };
    console.log('BdfgsdgsD ID', column)
    dispatch(deleteColumn(column));
  }

  return (
    <Droppable key={columnIndex} droppableId={`${columnIndex}`} type='column'>
      {(provided) => (
        <div className={styles.OneColumn}
          // draggable={true}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className={styles.column__title}>
            {column.title}
          </div>

          {column.Tasks && <TaskList  tasks={column.Tasks} columnIndex={columnIndex}/>}

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

          <div className={styles.delete_oneColumn_button_wrapper}>
            <a onClick={() => deleteOneColumn(column.id)}>
              <img src={deleteButton} className={styles.delete_column_button} alt='delete'></img>
            </a>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
    )
}

export default ColumnItem

