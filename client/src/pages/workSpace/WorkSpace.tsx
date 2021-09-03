import React, { useEffect, useState } from 'react';
import styles from './workSpace.module.scss';
import closeButton from '../../icon/close.png';


import Main from '../components/main/Main';
import { useAppSelector } from '../../store/reducers';
import { IBoard } from '../../types/types';
import { useDispatch } from 'react-redux';
import { creatBord, deleteBord, getAllBoards } from '../../store/boardReducer/boardThunk';
import { getAllBoardsApi, updateBoardApi } from '../../api/boardApi/boardApi';

const WorkSpace = () => {

  const dispatch = useDispatch();


  const userBoardArray = useAppSelector((state) => state.board.board)
  const [titleBoard, setTitleBoard] = useState('');


  const boardInfo = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('event', event);

    const board: IBoard = {
      title: titleBoard,
    };
    console.log('send', board);

    dispatch(creatBord(board));
    setTitleBoard("");
    event.preventDefault();
   };

   const deleteBoard = (id: number | null| undefined) => {
    const board: IBoard = {
      id: id,
    };
    console.log('BOARD ID',board)
    dispatch(deleteBord(board));

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
  useEffect(() => {
    dispatch(getAllBoards());
  }, [dispatch])

  return (
    <Main>
      <div className={styles.workSpace}>
        <div className={styles.header_input_wrapper}>
          <form onSubmit={boardInfo} className={styles.header_input_form}>
            <input
              onChange={(e) => setTitleBoard(e.target.value)}
              name='name' required
              // defaultValue="New Board" 
              value={titleBoard}
              type="text"
              placeholder='New board'
            />
            <button type="submit" className={styles.create_button}>CREATE</button>
          </form >
        </div>

        <div className={styles.board_wrapper}>
          {userBoardArray.map(board => <div className={styles.board}>
            <div className={styles.close_button_wrapper}>
              <a
              onClick={() => deleteBoard(board.id)}
              >
                <img src={closeButton} className={styles.close_button} alt='close'></img>
              </a>
            </div>
            <div className={styles.board__title}>{board.title}</div>
          </div>
          )}
        </div>
      </div>
    </Main>
  );
};

export default WorkSpace;