import { useEffect } from 'react';
import { useAppSelector } from '../../../store/reducers';
import { ITask} from '../../../types/types';
import styles from '../boardSpace.module.scss';
import TaskItem from '../TaskItem/TaskItem';

interface Props {
tasks?: ITask[],
columnIndex: number
}

const TaskList: React.FC<Props> = ({tasks, columnIndex}) => {
  return(
    <div className={styles.task_wrapper}>
      {/* {tasks?.map((task) => */}
      {tasks?.map((task, index) =>
        // <TaskItem task={task} />
        <TaskItem task={task} taskIndex={index} key={task.id} columnIndex={columnIndex}/>
      )}

    </div>
  )
}

export default TaskList

    