import { useAppSelector } from '../../../store/reducers';
import { ITask } from '../../../types/types';
import styles from '../boardSpace.module.scss';
import TaskItem from '../TaskItem/TaskItem';

interface Props {
Tasks: ITask[]
}

const TaskList: React.FC<Props> = ({Tasks}) => {


  return(
    <div className={styles.task_wrapper}>
      {/* {userTaskArray.filter(x => x.columnId === column.id).map(task => */}
      {Tasks.map(task =>
        <TaskItem task={task}/>
      )}

    </div>
  )
}

export default TaskList

    