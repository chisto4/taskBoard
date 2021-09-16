import { uploadImageApi } from "../../api/userApi/uploadFile/uploadImageApi";
import { editUsers, regUser, logUser, getToken, editUsersEmailPassword } from "../../api/userApi/userApi";
import { IUser } from "../../types/types";
import { AppDispatch } from "../reducers";
import {
  actionsGetTokenError,
  actionsLogAuth,
  actionsLogError,
  actionsLogOut,
  actionsSetError,
  actionsUpdateUser,
  actionsSetAuth,
  actionsUploadError,
  actionsUploadImage
} from './actionUser'

export const registrationUsers = (user: IUser) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await regUser(user)
    console.log('DATA WHEN ERROR', data)
    localStorage.setItem('token', data.token)
    dispatch(actionsUpdateUser(data.newUser));
    dispatch(actionsSetAuth(true));
  } catch (error: any) {
    dispatch(actionsSetError(error.response.data.message))
  }
};
export const loginUser = (user: IUser) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await logUser(user)
    localStorage.setItem('token', data.token)
    dispatch(actionsLogAuth(true));
    dispatch(actionsUpdateUser(data.userLogin));
  } catch (error: any) {
    dispatch(actionsSetError(error.response.data.message))
  }
};
export const updateUser = (user: IUser) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await editUsers(user)
    dispatch(actionsUpdateUser(data));
    dispatch(actionsLogAuth(true));
  } catch (error: any) {
    dispatch(actionsSetError(error.response.data.message))
  }
};
export const editUsersEmail = (user: IUser) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await editUsersEmailPassword(user)
    dispatch(actionsUpdateUser(data));
    dispatch(actionsLogAuth(true));
  } catch (error: any) {
    dispatch(actionsSetError(error.response.data.message))
  }
};
export const updateUserInformationToken = () => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const user = await getToken();
    dispatch(actionsUpdateUser(user));
    dispatch(actionsSetAuth(true));
  } catch (error: any) {
    dispatch(actionsSetError(error.response.data.message))
    localStorage.clear();
  }
};
export const uploadUserAvatar = (file: FormData) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const data = await uploadImageApi(file)
    const pathImage = data.file.path
    console.log(pathImage)
    dispatch(actionsUploadImage(pathImage));
  } catch (error: any) {
    dispatch(actionsSetError(error.response.data.message))
  }
};
export const logOutThunk = () => (dispatch: AppDispatch) => {
  dispatch(actionsLogOut());
  localStorage.clear();
};
