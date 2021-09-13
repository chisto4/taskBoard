
import { useAppSelector } from '../../../store/reducers';
import styles from '../boardSpace.module.scss';
import ColumnItem from '../ColumnItem/ColumnItem';
import { Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router';
import { IUseParams } from '../../../types/types';

const BoardItem = () => {

  const useBoardId: IUseParams = useParams()
  const boardIdNumber = Number(useBoardId.id)

  const userColumnArray = useAppSelector((state) => state.board.column)

  const sortingColumn = userColumnArray.sort((a,b) => {
    return a.position - b.position
  })
  console.log("SORTING ARRAY",sortingColumn )

  return (
    <Droppable droppableId={`${boardIdNumber}`} type='column' direction="horizontal">
      {(provided) => (
        <div className={styles.column_wrapper}
          {...provided.droppableProps}
          ref={provided.innerRef}>
          {sortingColumn.map(
            (column, index) =>
              <ColumnItem
                key={column.id}
                column={column}
                columnIndex={index}
              />
          )
          }
          {provided.placeholder}
        </div>
      )}

    </Droppable>

  )
}

export default BoardItem
