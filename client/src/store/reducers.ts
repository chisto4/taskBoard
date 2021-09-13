import { TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers } from "redux";
import {userReducer} from './userReducer/userReducer';
import {boardReducer} from './boardReducer/boardReducer';
import {store} from './'
export const rootReducer = combineReducers({
    user: userReducer,
    board: boardReducer
})

export type RootState = ReturnType<typeof rootReducer>
// export type StateReduxType = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;

