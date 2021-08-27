import { actions, ActionUser } from "./constansUser"
import { IUserState } from "../../types/types";

const initialState: IUserState = {
    user: {
        dob: new Date(),
        email: '',
        surname: '',
        name: '',
        password: '',
        login: '',
        avatarId: '',
    },
    auth: false,
    authAvatar: false,
    error: null,
    pathImage: null,
}

export const userReducer = (state = initialState, action: ActionUser): IUserState => {
    switch (action.type) {
        case actions.UPDATE_USER:
            return { ...state, user: action.payload }
        // case actions.SET_USER:
        //     return { ...state, user: action.payload }
        // case actions.LOG_USER:
        //     return { ...state, user: action.payload }
        // case actions.GET_TOKEN:
        //     return { ...state, user: action.payload }
        case actions.SET_AUTH:
            return { ...state, auth: action.payload }
        case actions.SET_ERROR:
            return { ...state, error: action.payload }
        case actions.LOG_AUTH:
            return { ...state, auth: action.payload }
        case actions.LOG_ERROR:
            return { ...state, error: action.payload }
        case actions.GET_TOKEN_AUTH:
            return { ...state, auth: action.payload }
        case actions.GET_TOKEN_ERROR:
            return { ...state, error: action.payload }
        case actions.LOG_OUT:
            return {
                ...state, auth: false, authAvatar: false, error: null, user: {
                    dob: new Date(),
                    email: '',
                    surname: '',
                    name: '',
                    password: '',
                    login: '',
                    avatarId: '',
                }
            }
        default:
            return state
    }

}

