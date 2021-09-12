import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';

import styles from './boardSpace.module.scss';
import { IColumn, ITask, IUseParams } from '../../types/types';
import { useAppSelector } from '../../store/reducers';
import { creatColumn, reorderTask, updateIndexColumn } from '../../store/boardReducer/boardThunk';

import Main from '../components/main/Main';
import BoardItem from './BoardItem/BoardItem';

const BoardSpace = () => {
  const useBoardId:IUseParams  = useParams()
  const boardIdNumber = Number(useBoardId.id)

  const dispatch = useDispatch();

 const [titleColumn, setTitleColumn] = useState('');
  const [positionColumn, setPositionColumn] = useState(null);
  const userColumnArray = useAppSelector((state) => state.board.column)
  const arrLenth = () => {
    if (!userColumnArray) {
      return 0
    }
    return userColumnArray.length
  }



  const creatNewColumnForm = (event: React.FormEvent<HTMLFormElement>) => {
    const column: IColumn = {
      title: titleColumn,
      position: arrLenth(),
      boardId: boardIdNumber,
      Tasks: []
    }
    dispatch(creatColumn(column));
    setTitleColumn("");
    event.preventDefault();
  }

  function onDragEnd(result: DropResult, provided: ResponderProvided) {
    const { source, destination, draggableId, type } = result;
    if (!destination) return
    // const taskId = +draggableId;
    // const columnIDEnd = +(destination.droppableId.split(' ')[1]);
    if(type !== 'column'){
      const taskIndexEnd = destination?.index;
      const columnIndexEnd = Number((destination.droppableId.split(' ')[0]));
      const taskIndexStart = source.index;
      const columnIndexStart = Number((source.droppableId.split(' ')[0]));
      console.log('value', taskIndexEnd)
  
  
  
      if (columnIndexStart === columnIndexEnd && taskIndexStart !== taskIndexEnd) {
        const newColumnState = userColumnArray.slice();
        const newTaskState = newColumnState[columnIndexEnd].Tasks;
        const [removed] = newTaskState.splice(taskIndexStart, 1);
        newTaskState.splice(taskIndexEnd, 0, removed);
  
        newColumnState[columnIndexEnd].Tasks = newTaskState;
        const sortArr = newTaskState.map((item, index) => item = {
          id: item.id,
          title: item.title,
          description: item.description,
          position: index,
          priority: item.priority,
          columnId: item.columnId,
        })
              
        const columnIndex: number = columnIndexStart;
        const task: ITask[] = sortArr
        dispatch(reorderTask(task, taskIndexStart, taskIndexEnd, columnIndex))
      }
      else if(columnIndexStart !== columnIndexEnd){
        if(!userColumnArray[columnIndexEnd].Tasks){
          userColumnArray[columnIndexEnd].Tasks = []
        }
        const baseColumnArr = userColumnArray;
        const arrTaskStart = userColumnArray[columnIndexStart].Tasks.slice();
        const arrTaskEnd = userColumnArray[columnIndexEnd].Tasks.slice();
        const [removed] = arrTaskStart.splice(taskIndexStart, 1);
        removed.columnId = baseColumnArr[columnIndexEnd].id
        // const updateTaskArrStart = arrTaskStart.splice(taskIndexStart, 1);
        // const updateTaskArrEnd = arrTaskEnd.splice(taskIndexEnd, 0, removed)
        arrTaskEnd.splice(taskIndexEnd, 0, removed)
        const arrTaskStartSort = arrTaskStart.map((item, index) => item={
          id: item.id,
          title: item.title,
          description: item.description,
          position: index,
          priority: item.priority,
          columnId: item.columnId,
        })
        dispatch(reorderTask(arrTaskStartSort, taskIndexStart, taskIndexEnd, columnIndexStart))
        baseColumnArr[columnIndexStart].Tasks = arrTaskStartSort;
        const ARRR = baseColumnArr[columnIndexStart]
        // dispatch(updateColumn(ARRR))
        console.log('ARRR ', ARRR)
  
        const arrTaskEndSort = arrTaskEnd.map((item, index) => item={
          id: item.id,
          title: item.title,
          description: item.description,
          position: index,
          priority: item.priority,
          columnId: item.columnId,
        })
        console.log('REMOVE', arrTaskEndSort)
  
        dispatch(reorderTask(arrTaskEndSort, taskIndexStart, taskIndexEnd, columnIndexEnd))
        baseColumnArr[columnIndexEnd].Tasks = arrTaskEndSort;
        const column = baseColumnArr[columnIndexEnd];
        // dispatch(updateColumn(column))
        console.log('UPDATE COLUMN', column)
        // dispatch(reorderColumn(column))
      }
    } else     if(type === 'column'){
      const boardID = Number((destination.droppableId));
      const columnID = Number(draggableId);
      const startColumnIndex = source.index;
      const endColumnIndex = destination.index;
      // console.log('VOT TUT', result, boardID, columnID, startColumnIndex, endColumnIndex);

      const allColumnState = userColumnArray.slice();
      // const newTaskState = allColumnState[columnIndexEnd].Tasks;
      const [removed] = allColumnState.splice(startColumnIndex, 1);
      allColumnState.splice(endColumnIndex, 0, removed);

      // allColumnState[columnIndexEnd].Tasks = newTaskState;
      const sortColumnArr = allColumnState.map((item, index) => item = {
        id: item.id,
        title: item.title,
        position: index,
        boardId: item.boardId,
        Tasks: item.Tasks,
      })
      console.log('VOT TUT 2', sortColumnArr);

      // const column: IColumn[] = sortColumnArr
      dispatch(updateIndexColumn(sortColumnArr))
    }

  }

  return (
    <Main>
      <div className={styles.columnSpace}>
        <div className={styles.new_column_input_wrapper}>
          <form onSubmit={creatNewColumnForm} className={styles.header_input_form}>
            <input
              onChange={(e) => setTitleColumn(e.target.value)}
              name='board' required
              value={titleColumn}
              type="text"
              placeholder='New column'
            />
            <button type="submit" className={styles.create_button}>CREATE</button>
          </form >
        </div>
      </div>

      <DragDropContext
      onDragEnd={onDragEnd}
    >
        <BoardItem />
      </DragDropContext>


    </Main>

  );
};

export default BoardSpace;