//USER
export interface IUser {
  login: string,
  password: string,
  email: string,
  dob: Date | string,
  surname?: string,
  name?: string,
  avatarId?: string | number | null | Blob,
  Image?: {
    pathImages: string,
  },
}

export interface IUserUpdate {
  name: string,
  surname: string,
  login: string,
  dob: Date | string,
}

export interface ILogUser {
  name?: string,
  surname?: string,
  login: string,
  password: string,
  email: string,
  avatarId?: string | number | null | Blob,
  dob?: Date | string,
  pathImage?: string | null,
  Image?: {
    pathImages: string,
  } | null,
  file?: string | Blob,
}

export interface IColumnIndex {
  columnIndex: number 
}
export interface ITaskIndex {
  taskIndex: number
}

export interface ITaskUpdate {
  columnIndex: IColumnIndex,
  taskIndex: ITaskIndex,
  task: ITask
}

export interface IUserState {
  user: IUser,
  auth: boolean,
  error: string | null,
  message: string | null,
}

//BOARD

export interface IBoard {
  title?: string | null,
  id?: number | undefined,
}
export interface IBoardRequest {
  id: number,
}
export interface IColumn {
  id?: number | undefined,
  title?: string | null,
  position?: number | null,
  boardId?: number | null,
  clickBoardId?: number | null | string,
  Tasks?: ITask[]
}
export interface IColumnRequest {
  id: number | null,
  boardId?: number | null,
}
export interface ITask {
  id?: number | undefined,
  title?: string | null,
  position?: number | null,
  description?: string | undefined,
  columnId?: number | undefined,
  priority?: number | null,
}
export interface ITaskRequest {
    id?: number | null,
    columnId?: number | null,
}

export interface IBoardState {
  board: IBoard[],
  column: IColumn[],
  task: ITask[],
  clickBoardId?: number | undefined,
}
