import { getAvatarInfo, uploadImageApi } from "../../api/userApi/uploadFile/uploadImageApi";
import { editUsers, regUser, logUser, getToken  } from "../../api/userApi/userApi";
import { IUser } from "../../types/types";
import { actionsGetTokenAuth, actionsGetTokenError, actionsLogAuth, actionsLogError, actionsLogOut, actionsLogUser, actionsSetAuth, actionsSetError, actionsSetUser, actionsUpdateUser, actionsUploadAuth, actionsUploadError, actionsUploadImage } from './actionUser'

export const registrationUsers = (user: IUser) => async (dispatch: any): Promise<void> => {
  try {
    const data = await regUser(user)
    localStorage.setItem('token', data.token)
    dispatch(actionsUpdateUser(data.newUser));
    dispatch(actionsSetAuth(true));
  } catch (error: any) {
    dispatch(actionsSetError(error.message))
  }
};
export const loginUser = (user: IUser) => async (dispatch: any): Promise<void> => {
  try {
    const data = await logUser(user)
    localStorage.setItem('token', data.token)
    dispatch(actionsUpdateUser(data.userLogin));
    updateUserInformationToken();
    dispatch(actionsLogAuth(true));
  } catch (error: any) {
    dispatch(actionsLogError(error.message))
  }
};
export const updateUser = (user: IUser) => async (dispatch: any): Promise<void> => {
  try {
    const data = await editUsers(user)
    dispatch(actionsUpdateUser(data));
    dispatch(actionsLogAuth(true));
  } catch (error: any) {
    dispatch(actionsLogError(error.message))
  }
};
export const updateUserInformationToken = () => async (dispatch: any): Promise<void> => {
  try {
    const user = await getToken();
    const data = await getAvatarInfo()
    const pathImage = data.pathImages
    dispatch(actionsUpdateUser(user));
    dispatch(actionsUploadAuth(pathImage));
    dispatch(actionsSetAuth(true));
  } catch (error: any) {
    dispatch(actionsGetTokenError(error.message))
    localStorage.clear();
  }
};
export const uploadUserAvatar = (file: any) => async (dispatch: any): Promise<void> => {
  try {
    const data = await uploadImageApi(file)
    const pathImage = data.file.path
    console.log(pathImage)
    dispatch(actionsUploadImage(data.avatarImage));
    dispatch(actionsUploadAuth(pathImage));
  } catch (error: any) {
    dispatch(actionsUploadError(error.message))
  }
};
export const logOutThunk = () => (dispatch: any) => {
  dispatch(actionsLogOut());
  localStorage.clear();
};
