
import { useAppSelector } from '../../../store/reducers';
import styles from '../boardSpace.module.scss';
import ColumnItem from '../ColumnItem/ColumnItem';
import { DragDropContext, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { ITask } from '../../../types/types';
import { useDispatch } from 'react-redux';
import { reorderTask, updateColumn, updateTask } from '../../../store/boardReducer/boardThunk';

const BoardItem = () => {


  const dispatch = useDispatch();

  const userColumnArray = useAppSelector((state) => state.board.column)
  // const boardId = userColumnArray[0].boardId

  // function onDragEnd(result: DropResult, provided: ResponderProvided) {
  //   const { source, destination, draggableId } = result;
  //   if (!destination) return
  //   // const taskId = +draggableId;
  //   // const columnIDEnd = +(destination.droppableId.split(' ')[1]);
  //   const taskIndexEnd = destination?.index;
  //   const columnIndexEnd = Number((destination.droppableId.split(' ')[0]));
  //   const taskIndexStart = source.index;
  //   const columnIndexStart = Number((source.droppableId.split(' ')[0]));
  //   console.log('value', taskIndexEnd)

  //   if (columnIndexStart === columnIndexEnd && taskIndexStart !== taskIndexEnd) {
  //     const newColumnState = userColumnArray.slice();
  //     const newTaskState = newColumnState[columnIndexEnd].Tasks;
  //     const [removed] = newTaskState.splice(taskIndexStart, 1);
  //     newTaskState.splice(taskIndexEnd, 0, removed);

  //     newColumnState[columnIndexEnd].Tasks = newTaskState;
  //     const sortArr = newTaskState.map((item, index) => item = {
  //       id: item.id,
  //       title: item.title,
  //       description: item.description,
  //       position: index,
  //       priority: item.priority,
  //       columnId: item.columnId,
  //     })
            
  //     const columnIndex: number = columnIndexStart;
  //     const task: ITask[] = sortArr
  //     dispatch(reorderTask(task, taskIndexStart, taskIndexEnd, columnIndex))
  //   }
  //   else if(columnIndexStart !== columnIndexEnd){
  //     if(!userColumnArray[columnIndexEnd].Tasks){
  //       userColumnArray[columnIndexEnd].Tasks = []
  //     }
  //     const baseColumnArr = userColumnArray;
  //     const arrTaskStart = userColumnArray[columnIndexStart].Tasks.slice();
  //     const arrTaskEnd = userColumnArray[columnIndexEnd].Tasks.slice();
  //     const [removed] = arrTaskStart.splice(taskIndexStart, 1);
  //     removed.columnId = baseColumnArr[columnIndexEnd].id
  //     // const updateTaskArrStart = arrTaskStart.splice(taskIndexStart, 1);
  //     // const updateTaskArrEnd = arrTaskEnd.splice(taskIndexEnd, 0, removed)
  //     arrTaskEnd.splice(taskIndexEnd, 0, removed)
  //     const arrTaskStartSort = arrTaskStart.map((item, index) => item={
  //       id: item.id,
  //       title: item.title,
  //       description: item.description,
  //       position: index,
  //       priority: item.priority,
  //       columnId: item.columnId,
  //     })
  //     dispatch(reorderTask(arrTaskStartSort, taskIndexStart, taskIndexEnd, columnIndexStart))
  //     baseColumnArr[columnIndexStart].Tasks = arrTaskStartSort;
  //     const ARRR = baseColumnArr[columnIndexStart]
  //     // dispatch(updateColumn(ARRR))
  //     console.log('ARRR ', ARRR)

  //     const arrTaskEndSort = arrTaskEnd.map((item, index) => item={
  //       id: item.id,
  //       title: item.title,
  //       description: item.description,
  //       position: index,
  //       priority: item.priority,
  //       columnId: item.columnId,
  //     })
  //     console.log('REMOVE', arrTaskEndSort)

  //     dispatch(reorderTask(arrTaskEndSort, taskIndexStart, taskIndexEnd, columnIndexEnd))
  //     baseColumnArr[columnIndexEnd].Tasks = arrTaskEndSort;
  //     const column = baseColumnArr[columnIndexEnd];
  //     // dispatch(updateColumn(column))
  //     console.log('UPDATE COLUMN', column)

  //     // dispatch(reorderColumn(column))

  //   }

  // }



  return (
    // <DragDropContext
    //   onDragEnd={onDragEnd}
    // >

  <Droppable droppableId='boardId' type='column'>
    {(provided) => (
      <div className={styles.column_wrapper}
      {...provided.droppableProps}
      ref={provided.innerRef}>
        {userColumnArray.map(
          (column, index) =>
            <ColumnItem key={column.id} column={column} columnIndex={index}
            />
            )
          }
    {provided.placeholder}
      </div>
    )}

  </Droppable>

    // </DragDropContext>
  )
}

export default BoardItem
