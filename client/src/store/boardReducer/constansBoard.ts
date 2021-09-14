import { IBoard, IColumn, ITask,  IBoardRequest, IColumnRequest, ITaskRequest, ITaskUpdate, IUpdateTaskIndex } from "../../types/types";


export enum actions {
  CREATE_BOARD = 'CREATE_BOARD',
  UPDATE_BOARD = 'UPDATE_BOARD',
  GET_ALL_BOARD = 'GET_ALL_BOARD',
  GET_ONE_BOARD = 'GET_ONE_BOARD',
  DELETE_BOARD = 'DELETE_BOARD',
  CHOICE_BOARD = 'CHOICE_BOARD',

  CREATE_COLUMN = 'CREATE_COLUMN',
  UPDATE_COLUMN = 'UPDATE_COLUMN',
  UPDATE_INDEX_COLUMN = 'UPDATE_INDEX_COLUMN',
  GET_ALL_COLUMN = 'GET_ALL_COLUMN',
  GET_ONE_COLUMN = 'GET_ONE_COLUMN',
  DELETE_COLUMN = 'DELETE_COLUMN',
  CLEARE_CASH_COLUMN = 'CLEARE_CASH_COLUMN',

  CREATE_TASK = 'CREATE_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  REORDER_TASK = 'REORDER_TASK',
  GET_ALL_TASK = 'GET_ALL_TASK',
  GET_ONE_TASK = 'GET_ONE_TASK',
  DELETE_TASK = 'DELETE_TASK',
}

export type ActionsCreateBoard = {
  type: actions.CREATE_BOARD,
  payload: IBoard
}
export type ActionsUpdateBoard = {
  type: actions.UPDATE_BOARD,
  payload: IBoard
}
export type ActionsGetAllBoard = {
  type: actions.GET_ALL_BOARD,
  payload: IBoard[]
}
export type ActionsGetOneBoard = {
  type: actions.GET_ONE_BOARD,
  payload: IBoardRequest
}
export type ActionsDeleteBoard = {
  type: actions.DELETE_BOARD,
  payload: IBoard
}
export type ActionsChoiceBoard = {
  type: actions.CHOICE_BOARD,
  payload: IColumn
}

export type ActionsCreateColumn = {
  type: actions.CREATE_COLUMN,
  payload: IColumnRequest
}
export type ActionsUpdateColumn = {
  type: actions.UPDATE_COLUMN,
  payload: IColumn
}
export type ActionsUpdateIndexColumn = {
  type: actions.UPDATE_INDEX_COLUMN,
  payload: IColumn[]
}
export type ActionsGetAllColumn = {
  type: actions.GET_ALL_COLUMN,
  payload: IColumn[]
}
export type ActionsGetOneColumn = {
  type: actions.GET_ONE_COLUMN,
  payload: IColumnRequest
}
export type ActionsDeleteColumn = {
  type: actions.DELETE_COLUMN,
  payload: IColumn
}
export type ActionsClearColumnState = {
  type: actions.CLEARE_CASH_COLUMN,
}

export type ActionsCreateTask = {
  type: actions.CREATE_TASK,
  payload: any
}
export type ActionsUpdateTask = {
  type: actions.UPDATE_TASK,
  payload: ITaskUpdate
}
export type ActionsReorderTask = {
  type: actions.REORDER_TASK,
  payload: IUpdateTaskIndex
}
export type ActionsGetAllTask = {
  type: actions.GET_ALL_TASK,
  payload: ITask[]
}
export type ActionsGetOneTask = {
  type: actions.GET_ONE_TASK,
  payload: ITaskRequest
}
export type ActionsDeleteTask = {
  type: actions.DELETE_TASK,
  payload: ITaskRequest
}


export type ActionBoard =
  | ActionsCreateBoard
  | ActionsUpdateBoard
  | ActionsGetAllBoard
  | ActionsGetOneBoard
  | ActionsDeleteBoard
  | ActionsCreateColumn
  | ActionsUpdateColumn
  | ActionsGetAllColumn
  | ActionsGetOneColumn
  | ActionsDeleteColumn
  | ActionsCreateTask
  | ActionsUpdateTask
  | ActionsGetAllTask
  | ActionsGetOneTask
  | ActionsDeleteTask
  | ActionsClearColumnState
  | ActionsReorderTask
  | ActionsUpdateIndexColumn
