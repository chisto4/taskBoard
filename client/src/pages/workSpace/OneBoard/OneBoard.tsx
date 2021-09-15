import { useState } from "react";

import styles from '../workSpace.module.scss';

import closeButton from '../../../icon/close_white.png';
import { IBoard, IColumn } from "../../../types/types";
import { useDispatch } from "react-redux";
import { deleteBoard, getAllColumns, updateBoard } from "../../../store/boardReducer/boardThunk";
import { useHistory } from "react-router";
import { BOARD_WINDOW } from "../../../api/const/const";

interface Props {
  index: number,
  boardItem: IBoard,
}

const OneBoard: React.FC<Props> = ({ index, boardItem }) => {

  const dispatch = useDispatch();
  let history = useHistory();

  const [titleBoardChange, setTitleBoardChange] = useState(boardItem.title);


  const boardUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("BOARDID", boardItem.id)

    const board: IBoard = {
      title: titleBoardChange,
      id: boardItem.id
    };
    dispatch(updateBoard(board));
    event.preventDefault();
  };

  const deleteOneBoard = (id: number) => {
    const board: IBoard = {
      id: boardItem.id,
      title: boardItem.title
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

  return (

    <div className={styles.board} key={index}>
        <div className={styles.close_button_wrapper}>
          <button className={styles.close_button} onClick={() => deleteOneBoard(boardItem.id)}>
            <img src={closeButton} className={styles.close_button_img} alt='delete'></img>
          </button>
        </div>

      <div 
      className={styles.one_board_wrapper}
      onClick={() => getAllColumnsClick(boardItem.id)}>

      </div>

      <div className={styles.board_title_input_wrapper}>
        <form onSubmit={boardUpdate} className={styles.board_title_input_form}>
          <input
            className={styles.border_update_input}
            onChange={(e) => setTitleBoardChange(e.target.value)}
            name='boardChange' required
            // value={titleBoard}
            value={titleBoardChange}
            // defaultValue={board.title}
            type="text"
            placeholder='New board'
          />
        </form >
      </div>

    </div>


  )

}

export default OneBoard