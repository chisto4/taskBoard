
import {actions} from './constansUser';
import { IUser } from "../../types/types";


export const actionsSetUser = (user: IUser) => ({
  type: actions.SET_USER,
  payload: user,
})

export const actionsSetAuth = (boolean: boolean) => ({
  type: actions.SET_AUTH,
  payload:boolean,
});

export const actionsSetError = (error:string | null) => ({
  type: actions.SET_ERROR,
  payload: error,
});

export const actionsLogUser = (user: IUser) => ({
  type: actions.LOG_USER,
  payload: user,
})

export const actionsLogAuth = (boolean: boolean) => ({
  type: actions.LOG_AUTH,
  payload:boolean,
});

export const actionsLogError = (error:string | null) => ({
  type: actions.LOG_ERROR,
  payload: error,
});

export const actionsUpdateUser = (user: IUser) => ({
  type: actions.UPDATE_USER,
  payload: user,
})