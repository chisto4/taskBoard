
import { actions, ActionsGetTokenAuth, ActionsGetTokenError, ActionsLogAuth,
         ActionsLogError, ActionsLogOut, ActionsLogUser, ActionsSetAuth, ActionsSetError, 
         ActionsSetUser, ActionsUploadError, ActionsUploadImage 
        } from './constansUser';
import { IUser } from "../../types/types";
import {ActionsUpdateUser} from "../../store/userReducer/constansUser"


export const actionsSetUser = (user: IUser): ActionsSetUser => ({
  type: actions.SET_USER,
  payload: user,
})

export const actionsSetAuth = (boolean: boolean): ActionsSetAuth => ({
  type: actions.SET_AUTH,
  payload: boolean,
});

export const actionsSetError = (error: string | null): ActionsSetError => ({
  type: actions.SET_ERROR,
  payload: error,
});

export const actionsLogUser = (user: IUser): ActionsLogUser => ({
  type: actions.LOG_USER,
  payload: user,
})

export const actionsLogAuth = (boolean: boolean): ActionsLogAuth => ({
  type: actions.LOG_AUTH,
  payload: boolean,
});

export const actionsLogError = (error: string | null): ActionsLogError => ({
  type: actions.LOG_ERROR,
  payload: error,
});

export const actionsUpdateUser = (user: IUser): ActionsUpdateUser  => ({
  type: actions.UPDATE_USER,
  payload: user,
})

export const actionsGetTokenAuth = (boolean: boolean): ActionsGetTokenAuth => ({
  type: actions.GET_TOKEN_AUTH,
  payload: boolean,
});

export const actionsGetTokenError = (error: string | null): ActionsGetTokenError => ({
  type: actions.GET_TOKEN_ERROR,
  payload: error,
});

export const actionsLogOut = (): ActionsLogOut => ({
  type: actions.LOG_OUT,
  // payload:boolean,
});


// UPLOAD IMAGE

export const actionsUploadImage = ( file: any ): ActionsUploadImage => ({
  type: actions.UPL_IMG,
  payload: file,
})

export const actionsUploadError = (error: string | null): ActionsUploadError => ({
  type: actions.UPLOAD_ERROR,
  payload: error,
});