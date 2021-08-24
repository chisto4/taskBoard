
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