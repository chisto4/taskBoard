import { useAppSelector } from '../../../store/reducers';
import styles from '../boardSpace.module.scss';
import TaskItem from '../TaskItem/TaskItem';

interface Props {
  id: number | undefined
}

const Tasks: React.FC<Props> = ({id}) => {

  const userTaskArray = useAppSelector((state) => state.board.column)

  return(
    <div className={styles.task_wrapper}>
      {/* {userTaskArray.filter(x => x.columnId === column.id).map(task => */}
      {userTaskArray.map(task =>
      task.Tasks.map => 
        <TaskItem task={task}/>
      )}

    </div>
  )
}

export default Tasks

    