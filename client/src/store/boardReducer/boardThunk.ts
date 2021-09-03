import { createBoardApi, deleteBoardApi, getAllBoardsApi, updateBoardApi } from "../../api/boardApi/boardApi";
import { IBoard } from "../../types/types";
import { AppDispatch } from "../reducers";
import { actionsSetError } from "../userReducer/actionUser";
import { actionsCreateBoard, actionsUpdateBoard, actionsGetAllBoard, actionsDeleteBoard,
        actionsCreateColumn, actionsUpdateColumn, actionsGetAllColumn, actionsDeleteColumn,
        actionsCreateTask, actionsUpdateTask, actionsGetAllTask, actionsDeleteTask
} from './actionBoard'

export const creatBord = (board: IBoard) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await createBoardApi(board)
    dispatch(actionsCreateBoard(data));
    } catch (error: any) {
    dispatch(actionsSetError(error.message))
  }
};
export const getAllBoards = (board: IBoard) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await getAllBoardsApi()
    dispatch(actionsGetAllBoard(data));
    } catch (error: any) {
    dispatch(actionsSetError(error.message))
  }
};
export const updateBord = (board: IBoard) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await updateBoardApi(board)
    dispatch(actionsUpdateBoard(data));
    } catch (error: any) {
    dispatch(actionsSetError(error.message))
  }
};
export const deleteBord = (board: IBoard) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await deleteBoardApi(board)
    dispatch(actionsDeleteBoard(board));
    } catch (error: any) {
    dispatch(actionsSetError(error.message))
  }
};