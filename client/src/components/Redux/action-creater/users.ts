import { Dispatch } from "redux"
import instance from "../../api"
import { GET_ALL_USERS } from "../const"
import { userReducer } from "../reducer/userReducer"
import { UserAction, UserActionTypes } from "../types/user"
import { useTypedSelector } from "../types/useTypeSelector"

export const getAllUsers = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try{
      dispatch({type: UserActionTypes.GET_ALL_USERS})
      const res = await instance.get('/users')
      dispatch({type: UserActionTypes.GET_ALL_USERS_SUCCESS, payload: res.data})
    } catch(e){
      dispatch({type: UserActionTypes.GET_ALL_USERS_FALSE, 
        payload: 'Some one error when load users'})
    }
  }
}