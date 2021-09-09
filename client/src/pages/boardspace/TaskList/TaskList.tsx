import { useEffect } from 'react';
import { useAppSelector } from '../../../store/reducers';
import { ITask } from '../../../types/types';
import styles from '../boardSpace.module.scss';
import TaskItem from '../TaskItem/TaskItem';

interface Props {
  tasks?: ITask[],
  columnIndex: number
}

const TaskList: React.FC<Props> = ({ tasks, columnIndex }) => {
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
    <div className={styles.task_wrapper}>
      {content}
    </div>
  )
}

export default TaskList

