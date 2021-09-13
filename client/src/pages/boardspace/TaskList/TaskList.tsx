import { Droppable } from 'react-beautiful-dnd';

import TaskItem from '../TaskItem/TaskItem';
import { ITask } from '../../../types/types';
import styles from '../boardSpace.module.scss';

interface Props {
  tasks?: ITask[],
  columnID?: number,
  columnIndex: number,
  valuePriority?: string
}

const TaskList: React.FC<Props> = ({ tasks, columnIndex, columnID, valuePriority }) => {

  const sortArr = tasks?.sort((a, b) => {
    if (!a.priority || !b.priority) return 0
    if (valuePriority === "green") return b.priority - a.priority
    if (valuePriority === "red") return a.priority - b.priority
    if (!a.position || !b.position) return 0
    if (!valuePriority) return a.position - b.position
  })

  const content = sortArr?.map((task, index) =>
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