
import { actions, ActionsCreateBoard, ActionsUpdateBoard, ActionsGetAllBoard,
ActionsGetOneBoard, ActionsDeleteBoard, ActionsCreateColumn, ActionsUpdateColumn,
ActionsGetAllColumn, ActionsGetOneColumn, ActionsDeleteColumn, ActionsCreateTask,
ActionsUpdateTask, ActionsGetAllTask, ActionsGetOneTask, ActionsDeleteTask
        } from './constansBoard';
import { IBoard, IColumn, ITask,  IBoardRequest, IColumnRequest, ITaskRequest } from "../../types/types";

export const actionsCreateBoard = (board: IBoard): ActionsCreateBoard => ({
  type: actions.CREATE_BOARD,
  payload: board,
})
export const actionsUpdateBoard = (board: IBoard): ActionsUpdateBoard => ({
  type: actions.UPDATE_BOARD,
  payload: board,
})
export const actionsGetAllBoard = (board: IBoard[]): ActionsGetAllBoard => ({
  type: actions.GET_ALL_BOARD,
  payload: board,
})
export const actionsGetOneBoard = (board: IBoardRequest): ActionsGetOneBoard => ({
  type: actions.GET_ONE_BOARD,
  payload: board,
})
export const actionsDeleteBoard = (board: IBoard): ActionsDeleteBoard => ({
  type: actions.DELETE_BOARD,
  payload: board,
})

export const actionsCreateColumn = (column: IColumn): ActionsCreateColumn => ({
  type: actions.CREATE_COLUMN,
  payload: column,
})
export const actionsUpdateColumn = (column: IColumn): ActionsUpdateColumn => ({
  type: actions.UPDATE_COLUMN,
  payload: column,
})
export const actionsGetAllColumn = (column: IColumn[]): ActionsGetAllColumn => ({
  type: actions.GET_ALL_COLUMN,
  payload: column
})
export const actionsGetOneColumn = (column: IColumnRequest): ActionsGetOneColumn => ({
  type: actions.GET_ONE_COLUMN,
  payload: column,
})
export const actionsDeleteColumn = (column: IColumnRequest): ActionsDeleteColumn => ({
  type: actions.DELETE_COLUMN,
  payload: column,
})

export const actionsCreateTask = (task: ITask): ActionsCreateTask => ({
  type: actions.CREATE_TASK,
  payload: task,
})
export const actionsUpdateTask = (task: ITask): ActionsUpdateTask => ({
  type: actions.UPDATE_TASK,
  payload: task,
})
export const actionsGetAllTask = (task: ITask[]): ActionsGetAllTask => ({
  type: actions.GET_ALL_TASK,
  payload: task,
})
export const actionsGetOneTask = (task: ITaskRequest): ActionsGetOneTask => ({
  type: actions.GET_ONE_TASK,
  payload: task,
})
export const actionsDeleteTask = (task: ITaskRequest): ActionsDeleteTask => ({
  type: actions.DELETE_TASK,
  payload: task,
})