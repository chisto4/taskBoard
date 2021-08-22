import { UserAction, UserActionTypes, UserState } from "../types/user"

const initialState: UserState = {
    users: [],
    loading: false,
    error: null
  }

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.GET_ALL_USERS:
            return {loading: true, error: null, users: []}
        case UserActionTypes.GET_ALL_USERS_SUCCESS:
            return {loading: false, error: null, users: action.payload }
        case UserActionTypes.GET_ALL_USERS_FALSE:
            return {loading: false, error: action.payload, users: []}
            default:
        return state
    }

}