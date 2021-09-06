import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { creatTask, deleteColumn } from '../../../store/boardReducer/boardThunk';
import { IColumn, ITask } from '../../../types/types';
import styles from '../boardSpace.module.scss';
import TaskItem from '../TasksItem/TasksItem';
import deleteButton from '../../../icon/deleteAll.png';


interface Props{
  column: IColumn;
  Tasks:ITask[]
} 

const ColumnItem: React.FC<Props> = ({column}) => {

  const [titleTask, setTitleTask] = useState('');
  const [positionTask, setPositionTask] = useState(null);
  const [priorityTask, setPriorityTask] = useState(null);
  const [taskColumnId, setColumnId] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const dispatch = useDispatch();

  // const [positionTask, setPositionTask] = useState(null);

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

  {userColumnArray.map(
    (column => <ColumnItem column={column} />)
  )}


  return (
    <div className={styles.OneColumn}>
    <div className={styles.column__title}>
    {column.title}
  </div>

    <TaskItem
      Tasks={column.Tasks}
    />

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

</div>  )
}

export default ColumnItem

