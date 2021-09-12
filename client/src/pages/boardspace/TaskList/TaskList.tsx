import { useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useAppSelector } from '../../../store/reducers';
import { ITask } from '../../../types/types';
import styles from '../boardSpace.module.scss';
import TaskItem from '../TaskItem/TaskItem';

interface Props {
  tasks?: ITask[],
  columnIndex: number,
  columnID?: number
}

const TaskList: React.FC<Props> = ({ tasks, columnIndex, columnID }) => {
  // let content: JSX.Element[] = []
  // if(!tasks){
  //   const createArrTask: ITask[] = []
  //     content = createArrTask.map((task, index) =>
  //   // <TaskItem task={task} />
  //   <TaskItem task={task} taskIndex={index} key={task.id} columnIndex={columnIndex} />
  //   )}
  const sortArr = tasks?.sort((a, b) => {
    if(!a.position || !b.position) return 0
    if (a.position > b.position) return 1
    if (a.position < b.position) return -1
    return 0
  })

   const content = sortArr?.map((task, index) =>
    // <TaskItem task={task} />
    <TaskItem task={task} taskIndex={index} key={task.id} columnIndex={columnIndex} />
  )


  return (
    <Droppable key={columnIndex} droppableId={`${columnIndex} ${columnID}`} >
      {(provided) => (
      <div className={styles.task_wrapper}
      {...provided.droppableProps}
      ref={provided.innerRef}
      >
        {content}
        {provided.placeholder}
      </div>
      )}
    </Droppable>

  )
}

export default TaskList

