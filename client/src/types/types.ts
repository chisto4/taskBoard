// export interface usersInterface {
//   id?: number,
//   name?: string,
//   surname?: string,
//   login: string,
//   password: string,
//   email: string,
//   dob?: Date,
//   Image?: string | number | null | Blob
// }

// export interface actionInterface {
//   type: string,
//   payload: usersInterface[],
// }

export interface IUser {
  name: string,
  surname: string,
  login: string,
  password: string,
  email: string,
  avatarId?: string | number | null | Blob,
  dob: Date | string,
  pathImage?: string | null,
  Image?: {
    pathImages: string,
  } | null,
  file?: string | Blob,
}

export interface ILogUser {
  login: string,
  password: string,
  email: string,
}

export interface IUserState {
  user: IUser,
  auth: boolean,
  error: string | null,
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