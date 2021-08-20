import {GET_ALL_USERS, GET_ALL_USERS_FALSE, GET_ALL_USERS_SUCCES} from '../const';

interface UserState {
    users: any[];
    loading: boolean;
    error: null | string;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null
}

interface UserAction {
    type: string;
    payload?: any;
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case GET_ALL_USERS:
            return {loading: true, error: null, users: []}
        case GET_ALL_USERS_SUCCES:
            return {loading: true, error: null, users: action.payload }
        case GET_ALL_USERS_FALSE:
            return {loading: true, error: action.payload, users: []}
            default:
        return state
    }

}