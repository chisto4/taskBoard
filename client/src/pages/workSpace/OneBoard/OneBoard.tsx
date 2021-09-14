import { useState } from "react";

import styles from '../workSpace.module.scss';

import closeButton from '../../../icon/close.png';
import { IBoard, IColumn } from "../../../types/types";
import { useDispatch } from "react-redux";
import { deleteBoard, getAllColumns } from "../../../store/boardReducer/boardThunk";
import { useHistory } from "react-router";
import { BOARD_WINDOW } from "../../../api/const/const";

interface Props {
  index: number,
  boardItem:IBoard,
}



const OneBoard: React.FC<Props> = ({index, boardItem}) => {

  const dispatch = useDispatch();
  let history = useHistory();

  const [titleBoardChange, setTitleBoardChange] = useState('');
  const [titleBoard, setTitleBoard] = useState('');


  const boardUpdate = (event: React.FormEvent<HTMLFormElement>) => {

    const board: IBoard = {
      title: titleBoard,
      id: 0
    };

    dispatch(creatBoard(board));
    setTitleBoard("");
    event.preventDefault();
  };

  const deleteOneBoard = (id: number) => {
    const board: IBoard = {
      id: id,
    };
    dispatch(deleteBoard(board));
  }

  const getAllColumnsClick = (id: number) => {
    const column: IColumn = {
      id,
      Tasks: [],
      position: 0,
    };
    dispatch(getAllColumns(column));
    history.push(BOARD_WINDOW.replace(':id', `${column?.id}`))
  }

 return(

  <div className={styles.board} key={index}
          >
            <div className={styles.close_button_wrapper}>
              <button className={styles.close_button} onClick={() => deleteOneBoard(boardItem.id)}>
                <img src={closeButton} className={styles.close_button_img} alt='delete'></img>
              </button>
            </div>

            <p className={styles.board__title}
              
            >
              <form onSubmit={boardUpdate} className={styles.header_input_form}>
            <input
              onChange={(e) => setTitleBoardChange(e.target.value)}
              name='board' required
              // value={titleBoard}
              value={titleBoardChange}
              // defaultValue={board.title}
              type="text"
              placeholder='New board'
            />
          </form >
              {/* {board.title} */}
            </p>

            <p onClick={() => getAllColumnsClick(boardItem.id)}>OPEN</p>

  </div>
 )

}

export default OneBoard