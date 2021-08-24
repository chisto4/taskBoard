import { actions, ActionUser }  from "./constansUser"
import { IUserState } from "../../types/types";

const initialState: IUserState = {
    user: {
        dob: new Date(),
        email: '',
        surname: '',
        name: '',
        password: '',
        login: '',
    },
    auth: false,
    error: null
  }

export const userReducer = (state = initialState, action: ActionUser): IUserState => {
    switch (action.type) {
        case actions.SET_USER:
            return {...state, user : action.payload }
        case actions.SET_AUTH:
            return {...state, auth: action.payload }
        case actions.SET_ERROR:
            return {...state, error: action.payload}
            default:
        return state
    }

}

