import { useEffect } from 'react';
import { useAppSelector } from '../../../store/reducers';
import { IColumnIndex, ITask, ITaskIndex } from '../../../types/types';
import styles from '../boardSpace.module.scss';
import TaskItem from '../TaskItem/TaskItem';

interface Props {
tasks?: ITask[],
columnIndex: IColumnIndex
}

const TaskList: React.FC<Props> = ({tasks, columnIndex}) => {
  return(
    <div className={styles.task_wrapper}>
      {/* {tasks?.map((task) => */}
      {tasks?.map((task, index) =>
        // <TaskItem task={task} />
                //@ts-ignore
        <TaskItem task={task} taskIndex={index} key={task.id} columnIndex={columnIndex}/>
      )}

    </div>
  )
}

export default TaskList

    