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

export interface IUpdateTaskIndex {
  taskIndexStart: number,
  taskIndexEnd: number,
  columnIndex: number,
  task: ITask[]

}
export interface IColumnIndex {
  columnIndex: number
}
export interface ITaskIndex {
  taskIndex: number
}

export interface ITaskUpdate {
  columnIndex: number,
  taskIndex: number,
  task: ITask
}

export interface IUserState {
  user: IUser,
  auth: boolean,
  error: string | null,
  message: string | null,
}

export interface IBoard {
  title: string,
  id: number,
}
export interface IBoardRequest {
  id: number,
}
export interface IColumn {
  id: number,
  title?: string | null,
  position: number,
  boardId?: number | null,
  clickBoardId?: number | null | string,
  Tasks: ITask[]
}
export interface IColumnRequest {
  id?: number,
  title?: string | null,
  position: number,
  boardId?: number | null,
  clickBoardId?: number | null | string,
  Tasks: ITask[]
}
export interface ITask {
  id?: number,
  title?: string,
  position: number,
  description?: string,
  columnId: number,
  priority: number,
}
export interface ITaskRequest {
  id?: number | null,
  columnId?: number | null,
}

export interface IBoardState {
  board: IBoard[],
  column: IColumn[] | IColumnRequest[],
  task: ITask[],
  clickBoardId?: number | undefined,
}

export interface IUseParams {
  id: string;
}

export interface IUpdateTask {
  id: number,
  title?: string,
  position?: number,
  columnId?: number,
  description?: string,
  priority?: number
}
