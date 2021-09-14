import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';

import styles from './boardSpace.module.scss';
import { IColumn, IColumnRequest, ITask, IUseParams } from '../../types/types';
import { useAppSelector } from '../../store/reducers';
import { creatColumn, getAllBoards, getAllColumns, reorderTask, updateIndexColumn } from '../../store/boardReducer/boardThunk';

import Main from '../components/Main/Main';
import BoardItem from './BoardItem/BoardItem';

const BoardSpace = () => {
  const useBoardId: IUseParams = useParams()
  const boardIdNumber = Number(useBoardId.id)

  const dispatch = useDispatch();

  
  const column: IColumn = {
    id: boardIdNumber,
    Tasks: [],
    position: 0,
  };

  useEffect(() => {
    dispatch(getAllBoards());
    dispatch(getAllColumns(column));
  }, [dispatch])


  const [titleColumn, setTitleColumn] = useState('');
  const userColumnArray = useAppSelector((state) => state.board.column)
  const stateBoard = useAppSelector((state) => state.board.board.find(brd=>brd.id===boardIdNumber))
  const boardTitle = stateBoard?.title
  const arrLenth = () => {
    if (!userColumnArray) {
      return 0
    }
    return userColumnArray.length
  }

  const creatNewColumnForm = (event: React.FormEvent<HTMLFormElement>) => {
    
    const column: IColumnRequest = {
      Tasks: [],
      title: titleColumn,
      position: arrLenth(),
      boardId: boardIdNumber
    }
    dispatch(creatColumn(column));
    setTitleColumn("");
    event.preventDefault();
  }

  function onDragEnd(result: DropResult, provided: ResponderProvided) {
    const { source, destination, type } = result;
    if (!destination) return
    if (type !== 'column') {
      const taskIndexEnd = destination?.index;
      const columnIndexEnd = Number((destination.droppableId.split(' ')[0]));
      const taskIndexStart = source.index;
      const columnIndexStart = Number((source.droppableId.split(' ')[0]));

      if (columnIndexStart === columnIndexEnd && taskIndexStart !== taskIndexEnd) {
        const newColumnState = userColumnArray.slice();
        const newTaskState = newColumnState[columnIndexEnd].Tasks;
        const [removed] = newTaskState.splice(taskIndexStart, 1);
        newTaskState.splice(taskIndexEnd, 0, removed);
        newColumnState[columnIndexEnd].Tasks = newTaskState;

        const sortArr = newTaskState.map((item, index) => item = {
          id: item.id,
          position: index,
          title: item.title,
          priority: item.priority,
          columnId: item.columnId,
          description: item.description,
        })

        const columnIndex: number = columnIndexStart;
        const task: ITask[] = sortArr
        dispatch(reorderTask(task, taskIndexStart, taskIndexEnd, columnIndex))
      }

      else if (columnIndexStart !== columnIndexEnd) {
        if (!userColumnArray[columnIndexEnd].Tasks) {
          userColumnArray[columnIndexEnd].Tasks = []
        }

        const baseColumnArr = userColumnArray;
        const arrTaskStart = userColumnArray[columnIndexStart].Tasks.slice();
        const arrTaskEnd = userColumnArray[columnIndexEnd].Tasks.slice();
        const [removed] = arrTaskStart.splice(taskIndexStart, 1);
        removed.columnId = baseColumnArr[columnIndexEnd].id || 0
        arrTaskEnd.splice(taskIndexEnd, 0, removed)

        const arrTaskStartSort = arrTaskStart.map((item, index) => item = {
          id: item.id,
          position: index,
          title: item.title,
          priority: item.priority,
          columnId: item.columnId,
          description: item.description,
        })

        dispatch(reorderTask(arrTaskStartSort, taskIndexStart, taskIndexEnd, columnIndexStart))
        baseColumnArr[columnIndexStart].Tasks = arrTaskStartSort;

        const arrTaskEndSort = arrTaskEnd.map((item, index) => item = {
          id: item.id,
          position: index,
          title: item.title,
          priority: item.priority,
          columnId: item.columnId,
          description: item.description,
        })

        dispatch(reorderTask(arrTaskEndSort, taskIndexStart, taskIndexEnd, columnIndexEnd))
        baseColumnArr[columnIndexEnd].Tasks = arrTaskEndSort;
      }
    } else if (type === 'column') {
      const startColumnIndex = source.index;
      const endColumnIndex = destination.index;

      const allColumnState = userColumnArray.slice();
      const [removed] = allColumnState.splice(startColumnIndex, 1);
      allColumnState.splice(endColumnIndex, 0, removed);

      const sortColumnArr = allColumnState.map((item, index) => item = {
        id: item.id || 0,
        title: item.title,
        position: index,
        boardId: item.boardId,
        Tasks: item.Tasks,
      })

      dispatch(updateIndexColumn(sortColumnArr))
    }
  }

  return (
    <Main>
      <div className={styles.columnSpace}>
        <div className={styles.new_column_input_wrapper}>
          <h4>" {boardTitle} "</h4>
          <form onSubmit={creatNewColumnForm} className={styles.header_input_form}>
            <input
              onChange={(e) => setTitleColumn(e.target.value)}
              name='columnInputTitle' required
              value={titleColumn}
              type="text"
              placeholder='New column'
            />
            <button type="submit" className={styles.create_button}>CREATE</button>
          </form >
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <BoardItem />
      </DragDropContext>

    </Main>

  );
};

export default BoardSpace;