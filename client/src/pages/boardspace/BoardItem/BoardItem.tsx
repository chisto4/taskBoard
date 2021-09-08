
import { useAppSelector } from '../../../store/reducers';
import styles from '../boardSpace.module.scss';
import ColumnItem from '../ColumnItem/ColumnItem';
import { DragDropContext } from 'react-beautiful-dnd';

const BoardItem = () => {

  const userColumnArray = useAppSelector((state) => state.board.column)

  function onDragEnd() {
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>

      <div className={styles.column_wrapper}>
        {userColumnArray.map(
          (column, index) =>
            // <Droppable key={index} droppableId={`${index}`}>
            <ColumnItem key={column.id} column={column} columnIndex={index}
            />
          // <Droppable>
        )
        }
      </div>
    </DragDropContext>
  )
}

export default BoardItem
