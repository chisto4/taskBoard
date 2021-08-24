import { logUser } from "../../api/userApi/loginUser";
import { regUser } from "../../api/userApi/registrationUser";
import { editUsers } from "../../api/userApi/updateUser";
import { IUser } from "../../types/types";
import {actionsLogAuth, actionsLogError, actionsLogUser, actionsSetAuth, actionsSetError, actionsSetUser, actionsUpdateUser} from './actionUser'

export const registrationUsers = (user: IUser) => async (dispatch: any):Promise<void> => {
  try {
    const data = await regUser(user)
      localStorage.setItem('token', data.token)
      dispatch(actionsSetUser(data.newUser));
      dispatch(actionsSetAuth(true));
  } catch(error: any) {
      dispatch(actionsSetError(error.message))
  }
};
export const loginUser = (user: IUser) => async (dispatch: any):Promise<void> => {
  try {
    const data = await logUser(user)
      localStorage.setItem('token', data.token)
      dispatch(actionsLogUser(data.userLogin));
      dispatch(actionsLogAuth(true));
  } catch(error: any) {
      dispatch(actionsLogError(error.message))
  }
};
export const updateUser = (user: IUser) => async (dispatch: any):Promise<void> => {
  try {
    const data = await editUsers(user)
      dispatch(actionsUpdateUser(data));
      dispatch(actionsLogAuth(true));
  } catch(error: any) {
      dispatch(actionsLogError(error.message))
  }
};
