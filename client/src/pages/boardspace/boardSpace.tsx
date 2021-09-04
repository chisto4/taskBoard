import React, {useState} from 'react';
import styles from './boardSpace.module.scss';

import Main from '../components/main/Main';
import { useAppSelector } from '../../store/reducers';
import { IColumn } from '../../types/types';

const BoardSpace = () => {

  const userColumnArray = useAppSelector((state) => state.board.column)
  const userTaskArray = useAppSelector((state) => state.board.task)
  const activeBoard = useAppSelector((state) => state.board.clickBoardId)

  const [titleColumn, setTitleColumn] = useState('');
  const [positionColumn, setPositionColumn] = useState('');
  const [boardIdColumn, setIdColumn] = useState('');

  const [titleTask, setTitleTask] = useState('');
  const [positionTask, setPositionTask] = useState('');
  const [priorityTask, setPriorityTask] = useState('');
  const [taskColumnId, setColumnId] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const craetNewColumnForm = (event: React.FormEvent<HTMLFormElement>) => {
    const column: IColumn = {
      title: titleColumn,
      boardId: 1,
    }
    event.preventDefault();
  }

//   const [columns, setColumns] = useState([
//     {id:1, title:"What need", items:[{id:1, title:"Develpometn"},{id:2, title:'Create desigen Todo'},
//                 {id:3, title:'made Hello world made Hello world '},{id:4, title:'Always make Zalupa test on console'}]},
//     {id:2, title:"Process on work", items:[{id:1, title:'Write your cold develope'}, 
//                 {id:2, title:'Choice deisgen on Dribble'},{id:3, title:'react Native'}]},
//     {id:3, title:'Complete', items:[{id:1, title:'Make a photo'}]}
//   ])

//   //FORE ITEM
//   const [currentColumn, setCurrentColumn] = useState(null)
//   const [currentItem, setCurrentItem] = useState(null)

//   function dragOverHandler(event){
//     event.preventDefault()
//     if(event.target.className === 'item'){
//       event.target.classList.toggle('boxShadow')
//     }
//   }

//   function dragLeaveHandler(event){
//     event.target.classList.remove('boxShadow')
//   }

//   function dragStartHandler(event, column, item){
//     console.log('Start column', column) 
//     console.log('Start item', item) 
//     setCurrentColumn(column)
//     setCurrentItem(item)
//   }

//   function dragEndHandler(event){
//     event.target.classList.remove('boxShadow')
//   }

//   function dragDropHandler(event, column, item){
//     event.preventDefault()
//     const currentIndex = currentColumn.items.indexOf(currentItem)
//     currentColumn.items.splice(currentIndex, 1)
//     const dropIndex = column.items.indexOf(item)
//     column.items.splice(dropIndex + 1, 0, currentItem)
//     setColumns(columns.map(brd => {
//       if (brd.id === column.id){
//         return column
//       }
//       if (brd.id === currentColumn.id){
//         return currentColumn
//       }
//       return brd
//     }))
//   }

//   function dropeZeroStickHandler(event, column, item) {
//     const currentId = column.items.map(item => item.id)
// if (!currentId.includes(currentItem.id)) {
//   column.items.push(currentItem)
//          const currentIndex = currentColumn.items.indexOf(currentItem)
//          currentColumn.items.splice(currentIndex, 1)
//          setColumns(columns.map(b => {
//             if (b.id === column.id) {
//                return column
//             }
//             if (b.id === currentColumn.id) {
//                return currentColumn
//             }
//             return b
//          }))
//       }
//   }

  return (
    <Main>
    <div className={styles.columnSpace}>
    <div className={styles.new_column_input_wrapper}>
          <form onSubmit={craetNewColumnForm} className={styles.header_input_form}>
            <input
              onChange={(e) => setTitleColumn(e.target.value)}
              name='board' required
              // defaultValue="New Board" 
              // value={setTitleColumn}
              type="text"
              placeholder='New column'
            />
            <button type="submit" className={styles.create_button}>CREATE</button>
          </form >
        </div>


    <div className={styles.column_wrapper}>

      {userColumnArray.map(column =>

        <div className={styles.column}
        // onDragOver={(event)=> dragOverHandler(event)}
        // onDrop={(event)=> dropeZeroStickHandler(event, column, {item: column.item})}
        >
          <div className={styles.column__title}>
            {column.title}
          </div>

        <div className={styles.task_wrapper}>
        {userTaskArray.filter(x => x.columnId === column.id).map(task =>  
                <div 
                // onDragOver={(event)=> dragOverHandler(event)}
                // onDragLeave={(event)=> dragLeaveHandler(event)}
                // onDragStart={(event)=> dragStartHandler(event, column, item)}
                // onDragEnd={(event)=> dragEndHandler(event)}
                // onDrop={(event)=> dragDropHandler(event, column, item)}
                className={styles.task}
                draggable={true}
                >
                  {task.title}
                </div>
              )}
        </div>

<form 
      // onSubmit={boardInfo} 
      className={styles.new_task_input_form}>
        <input
          // onChange={(e) => setTitleColumn(e.target.value)}
          name='name' required
          // value={titleColumn}
          type="text"
          placeholder='`New task'
        />
          {/* <button type="submit" className={styles.create_button}>CREATE</button> */}
      </form >


        </div>
        )}
      </div>
    </div>
    </Main>
    );
  };

export default BoardSpace;