
import { useAppSelector } from '../../../store/reducers';
import styles from '../boardSpace.module.scss';
import ColumnItem from '../ColumnItem/ColumnItem';
import { DragDropContext } from 'react-beautiful-dnd';
import { ITask } from '../../../types/types';
import { useDispatch } from 'react-redux';
import { reorderTask, updateTask } from '../../../store/boardReducer/boardThunk';

const BoardItem = () => {


  const dispatch = useDispatch();

  const userColumnArray = useAppSelector((state) => state.board.column)
  const columnState = userColumnArray[1]

  function onDragEnd(result: any) {
    console.log('end', result)
    const {source, destination, draggableId} = result;

    const taskId = +draggableId;
    const columnIDEnd = +(destination.droppableId.split(' ')[1]);
    const taskIndexStart = source.index;
    const taskIndexEnd = destination.index;
    const columnIndexStart = +(source.droppableId.split(' ')[0]);
    const columnIndexEnd = +(destination.droppableId.split(' ')[0]);
    console.log('value', taskIndexEnd)

    if(!destination) {
      return;
    }
    if(columnIndexStart===columnIndexEnd && taskIndexStart !== taskIndexEnd){
      const columnIndex:number = columnIndexStart;
      const task: ITask = {
        id:taskId,
        position: taskIndexEnd
      }
  
      dispatch(reorderTask(task, taskIndexStart, taskIndexEnd, columnIndex ))
    }

  }

  return (
    <DragDropContext
      onDragStart={(start, ) => console.log('start', start)}
      // onDragEnd={(end, event) => console.log('end', end)}
      onDragEnd={onDragEnd}
      >

      <div className={styles.column_wrapper}>
        {userColumnArray.map(
          (column, index) =>
            <ColumnItem key={column.id} column={column} columnIndex={index}
            />
        )
        }
      </div>
    </DragDropContext>
  )
}

export default BoardItem
