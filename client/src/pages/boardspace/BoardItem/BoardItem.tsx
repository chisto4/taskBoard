
import { useHistory, useParams } from 'react-router';
import { Droppable } from 'react-beautiful-dnd';

import styles from '../boardSpace.module.scss';
import ColumnItem from '../ColumnItem/ColumnItem';
import { IColumnRequest, IUseParams } from '../../../types/types';
import { useAppSelector } from '../../../store/reducers';
import { creatColumn } from '../../../store/boardReducer/boardThunk';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { WORK_SPACE } from '../../../api/const/const';

interface Props {
  arrLenth: number,
}

const BoardItem : React.FC<Props>  = ({arrLenth}) => {

  const dispatch = useDispatch();
  let history = useHistory();

  const useBoardId: IUseParams = useParams()
  const boardIdNumber = Number(useBoardId.id)

  const userColumnArray = useAppSelector((state) => state.board.column)
  const errorWrapper = useAppSelector((state) => state.user.error)

  const [titleColumn, setTitleColumn] = useState('');

  const sortingColumn = userColumnArray.sort((a, b) => {
    return a.position - b.position
  })

  const creatNewColumnForm = (event: React.FormEvent<HTMLFormElement>) => {
    
    const column: IColumnRequest = {
      Tasks: [],
      title: titleColumn,
      position: arrLenth,
      boardId: boardIdNumber
    }
    dispatch(creatColumn(column));
    setTitleColumn("");
    event.preventDefault();
  }

  useEffect(() => {
    if(errorWrapper) history.push(WORK_SPACE)
  }, [errorWrapper, history])

  return (
    <Droppable droppableId={`${boardIdNumber}`} type='column' direction="horizontal">
      {(provided) => (
        <div className={styles.column_wrapper}
          {...provided.droppableProps}
          ref={provided.innerRef}>
          {sortingColumn.map(
            (column, index) =>
              <ColumnItem
                key={index}
                column={column}
                columnIndex={index}
              />
          )}
        <div className={styles.new_column_input_wrapper}>
          <form onSubmit={creatNewColumnForm} className={styles.header_input_form}>
            <input
              onChange={(e) => setTitleColumn(e.target.value)}
              name='columnInputTitle' required
              value={titleColumn}
              type="text"
              placeholder='+ Add another column'
            />
            {/* <button type="submit" className={styles.create_button}>CREATE</button> */}
          </form >
        </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default BoardItem
