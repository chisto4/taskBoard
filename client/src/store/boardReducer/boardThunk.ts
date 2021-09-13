import { createBoardApi, createColumnApi, createTaskApi, deleteBoardApi, deleteColumnApi, deleteTaskApi, getAllBoardsApi, getAllColumnsApi, getAllTaskApi, updateBoardApi, updateColumnApi, updateIndexColumnApi, updateTaskApi, updateTaskPositionApi } from "../../api/boardApi/boardApi";
import { IBoard, IColumn, ITask } from "../../types/types";
import { AppDispatch } from "../reducers";
import { actionsSetError } from "../userReducer/actionUser";
import { actionsCreateBoard, actionsUpdateBoard, actionsGetAllBoard, actionsDeleteBoard,
        actionsCreateColumn, actionsUpdateColumn, actionsGetAllColumn, actionsDeleteColumn,
        actionsCreateTask, actionsUpdateTask, actionsGetAllTask, actionsDeleteTask, actionsClearColumn, actionsReorderTaskIndex, actionsUpdateIndexColumn
} from './actionBoard'

//BOARD

export const creatBoard = (board: IBoard) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await createBoardApi(board)
    dispatch(actionsCreateBoard(data));
    } catch (error: any) {
    dispatch(actionsSetError(error.message))
  }
};
export const getAllBoards = () => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await getAllBoardsApi()
    dispatch(actionsGetAllBoard(data));
    } catch (error: any) {
    dispatch(actionsSetError(error.message))
  }
};
export const updateBoard = (board: IBoard) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await updateBoardApi(board)
    dispatch(actionsUpdateBoard(data));
    } catch (error: any) {
    dispatch(actionsSetError(error.message))
  }
};
export const deleteBoard = (board: IBoard) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    await deleteBoardApi(board)
    dispatch(actionsDeleteBoard(board));
    } catch (error: any) {
    dispatch(actionsSetError(error.message))
  }
};

// COLUMN 

export const creatColumn = (column: IColumn) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await createColumnApi(column)
    dispatch(actionsCreateColumn(data));
    } catch (error: any) {
    dispatch(actionsSetError(error.message))
  }
};
export const getAllColumns = (column: IColumn) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await getAllColumnsApi(column)
    dispatch(actionsGetAllColumn(data));
    } catch (error: any) {
    dispatch(actionsSetError(error.message))
  }
};
export const clearAllColumns = () => (dispatch: AppDispatch) => {
    dispatch(actionsClearColumn());
};
export const updateColumn = (column: IColumn) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await updateColumnApi(column)
    dispatch(actionsUpdateColumn(data));
    } catch (error: any) {
    dispatch(actionsSetError(error.message))
  }
};
export const updateIndexColumn = (column: IColumn[]) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await updateIndexColumnApi(column)
    dispatch(actionsUpdateIndexColumn(data));
    } catch (error: any) {
    dispatch(actionsSetError(error.message))
  }
};
export const deleteColumn = (column: IColumn) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    await deleteColumnApi(column)
    dispatch(actionsDeleteColumn(column));
    } catch (error: any) {
    dispatch(actionsSetError(error.message))
  }
};
// TASK

export const creatTask = (task: ITask) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data: ITask = await createTaskApi(task)
    
    dispatch(actionsCreateTask(data));
    } catch (error: any) {
    dispatch(actionsSetError(error.message))
  }
};
export const getAllTasks = (task: ITask) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await getAllTaskApi(task)
    dispatch(actionsGetAllTask(data));
    } catch (error: any) {
    dispatch(actionsSetError(error.message))
  }
};
export const updateTask = (task: ITask, columnIndex: number, 
  taskIndex: number) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await updateTaskApi(task)
    dispatch(actionsUpdateTask({task: data, columnIndex, taskIndex}));
    } catch (error: any) {
    dispatch(actionsSetError(error.message))
  }
};
export const reorderTask = (task:ITask[], taskIndexStart: number, taskIndexEnd: number, columnIndex: number) => 
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(actionsReorderTaskIndex({task, taskIndexStart, taskIndexEnd, columnIndex}));
try {
    await updateTaskPositionApi(task)  
  } catch(error: any) {
    dispatch(actionsSetError(error.message))
  }
};

export const deleteTask = (task: ITask) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    await deleteTaskApi(task)
    dispatch(actionsDeleteTask(task));
    } catch (error: any) {
    dispatch(actionsSetError(error.message))
  }
};
