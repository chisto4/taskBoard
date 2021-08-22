export interface UserState {
  users: any[];
  loading: boolean;
  error: null | string;
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