import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Draggable } from 'react-beautiful-dnd';

import { creatTask, deleteColumn } from '../../../store/boardReducer/boardThunk';
import { IColumn, ITask } from '../../../types/types';
import styles from '../boardSpace.module.scss';
import deleteButton from '../../../icon/delete_red.png';
import { useAppSelector } from '../../../store/reducers';
import TaskList from '../TaskList/TaskList';


interface Props {
  column: IColumn;
  columnIndex: number
}

const ColumnItem: React.FC<Props> = ({ column, columnIndex }) => {

  const dispatch = useDispatch();

  const [titleTask, setTitleTask] = useState('');
  const [filterValue, setFilterValue] = useState('')
  const columnArr = useAppSelector((state) => state.board.column[columnIndex].Tasks?.length)
  const arrLenth = () => {
    if (!columnArr) {
      return 0
    }
    return columnArr
  }

  const creatNewTaskForm = (event: React.FormEvent<HTMLFormElement>, id: number) => {
    console.log('IDDDD', id)
    const task: ITask = {
      title: titleTask,
      position: arrLenth(),
      priority: 2,
      description: '',
      columnId: id,
    }
    dispatch(creatTask(task));
    setTitleTask("");
    event.preventDefault();
  }

  const deleteOneColumn = (id: number) => {
    const column: IColumn = {
      id: id,
      Tasks: [],
      position: 0
    };
    dispatch(deleteColumn(column));
  }

  const filterPriorityTask = () => {
    if (filterValue === "red") {
      return 'red'
    } else if (filterValue === "green") {
      return 'green'
    }
  }

  return (
    <Draggable key={column.id} draggableId={`${column.id}`} index={columnIndex}>
      {(provided) => (
        <div className={styles.OneColumn}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={styles.column__title}
          >
            {column.title}
          </div>

          <div className={styles.Filter_priority_wrapper}>

            <button
              className={styles.Filter_priority_button_red}
              onClick={() => setFilterValue('red')}
            >
            </button>

            <button
              className={styles.Filter_priority_button_green}
              onClick={() => setFilterValue('green')}
            >
            </button>

          </div>

          {column.Tasks && <TaskList
            tasks={column.Tasks}
            columnIndex={columnIndex}
            columnID={column.id}
            valuePriority={filterPriorityTask()}
          />}

          <form
            onSubmit={(e) => creatNewTaskForm(e, column.id)}
            className={styles.new_task_input_form}>
            <input
              onChange={(e) => setTitleTask(e.target.value)}
              name='name' required
              value={titleTask}
              type="text"
              placeholder='+ Add another card'
            />
          </form >

          <div className={styles.delete_oneColumn_button_wrapper}>
            <button className={styles.delete_button_wrapper} onClick={() => deleteOneColumn(column.id)}>
              <img src={deleteButton} className={styles.delete_column_button} alt='delete'></img>
            </button>
          </div>
        </div>

      )}
    </Draggable >
  )
}

export default ColumnItem

