import { regUser } from "../../api/userApi/registrationUser";
import { IUser } from "../../types/types";
import {actionsSetAuth, actionsSetError, actionsSetUser} from './actionUser'

export const registrationUsers = (user: IUser) => async (dispatch: any):Promise<void> => {
  try {
    const data = await regUser(user)
      localStorage.setItem('token', data.token)
      dispatch(actionsSetUser(data.user));
      dispatch(actionsSetAuth(true));
  } catch(error: any) {
      dispatch(actionsSetError(error.message))
  }
};
