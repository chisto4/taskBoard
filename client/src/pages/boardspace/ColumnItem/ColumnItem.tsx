import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Draggable, Droppable,DraggableProvided } from 'react-beautiful-dnd';

import { creatTask, deleteColumn } from '../../../store/boardReducer/boardThunk';
import { IColumn, ITask } from '../../../types/types';
import styles from '../boardSpace.module.scss';
import TaskList from '../TaskList/TaskList';
import deleteButton from '../../../icon/deleteAll.png';
import { useAppSelector } from '../../../store/reducers';


interface Props {
  column: IColumn;
  columnIndex: number
}

const ColumnItem: React.FC<Props> = ({ column, columnIndex }) => {

  const columnArr = useAppSelector((state) => state.board.column[columnIndex].Tasks?.length)
  const arrLenth = () => {
    if (!columnArr) {
      return 0
    }
    return columnArr
  }


  const [titleTask, setTitleTask] = useState('');
  const [priorityTask, setPriorityTask] = useState(null);
  const [taskColumnId, setColumnId] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [filterValue, setFilterValue] = useState('')

  const dispatch = useDispatch();

  const craetNewTaskForm = (event: React.FormEvent<HTMLFormElement>, id: number | undefined) => {
    const task: ITask = {
      title: titleTask,
      position: arrLenth(),
      priority: 2,
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
      Tasks: [],
      position: 0
    };
    console.log('BdfgsdgsD ID', column)
    dispatch(deleteColumn(column));
  }

  const filterPriorityTask = () => {
    if(filterValue === "red"){
      return 'red'
    } else if(filterValue === "green"){
      return 'green'
    }
  }

  return (
    <Draggable key={column.id} draggableId={`${column.id}`} index={columnIndex}>
      {(provided) => (
        <div className={styles.OneColumn}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          // style={{ ...provided.draggableProps.style }}
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
              RED
            </button>
            <button
            className={styles.Filter_priority_button_green}
            onClick={() => setFilterValue('green')}
            >
              GREEN
            </button>
            
          </div>


          {/* <div
          className={styles.task_list_drop}
        > */}
            {column.Tasks && <TaskList 
            tasks={column.Tasks} 
            columnIndex={columnIndex} 
            columnID={column.id} 
            valuePriority={filterPriorityTask()}
            />}
          {/* </div> */}

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
          </div>

        )}
          </Draggable >
  )
}

export default ColumnItem

