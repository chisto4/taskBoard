export interface usersInterface {
    id?: number,
    name?: string,
    surname?: string,
    login: string,
    password: string,
    email: string,
    dob?: Date,
}

export interface actionInterface {
    type: string,
    payload: usersInterface[],
}

export interface IUser {
  name: string,
  surname: string,
  login: string,
  password: string,
  email: string,
  dob: Date | string
}

export interface ILogUser {
  login: string,
  password: string,
  email: string,
}

export interface IUserState {
  user: IUser,
  auth: boolean,
  error: string | null
  }


  
export enum UserActionTypes {
  GET_ALL_USERS = 'GET_ALL_USERS',
  GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS',
  GET_ALL_USERS_FALSE = 'GET_ALL_USERS_FALSE',
}

interface GetAllUsersAction {
  type: UserActionTypes.GET_ALL_USERS;
}
interface GetAllUsersSuccessAction {
  type: UserActionTypes.GET_ALL_USERS_SUCCESS;
  payload: any[];
}
interface GetAllUsersFalseAction {
  type: UserActionTypes.GET_ALL_USERS_FALSE;
  payload: string;
}

export type UserAction = GetAllUsersAction | GetAllUsersSuccessAction | GetAllUsersFalseAction