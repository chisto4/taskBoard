import { IUser } from "../../types/types";


export enum actions {
  SET_USER = 'SET_USER',
  SET_AUTH = 'SET_AUTH',
  SET_ERROR = 'SET_ERROR',
  LOG_USER = 'LOG_USER',
  LOG_AUTH = 'LOG_AUTH',
  LOG_ERROR = 'LOG_ERROR',
  UPDATE_USER_EMAIL = 'UPDATE_USER_EMAIL',
  GET_ONE_USER = 'GET_ONE_USER',
  UPDATE_USER = 'UPDATE_USER',
  DELETE_USER = 'DELETE_USER',
  GET_TOKEN = 'GET_TOKEN',
}

export type ActionsSetUser = {
  type: actions.SET_USER,
  payload: IUser
}

export type ActionsSetAuth = {
  type: actions.SET_AUTH,
  payload: boolean
}
export type ActionsSetError = {
  type: actions.SET_ERROR,
  payload: string | null
}

export type ActionsLogUser = {
  type: actions.LOG_USER,
  payload: IUser
}

export type ActionsLogAuth = {
  type: actions.LOG_AUTH,
  payload: boolean
}
export type ActionsLogError = {
  type: actions.LOG_ERROR,
  payload: string | null
}

export type ActionsUpdateUser = {
  type: actions.UPDATE_USER,
  payload: IUser
}

export type ActionUser =
  | ActionsSetUser
  | ActionsSetAuth
  | ActionsSetError
  | ActionsLogUser
  | ActionsLogAuth
  | ActionsLogError
  | ActionsUpdateUser
