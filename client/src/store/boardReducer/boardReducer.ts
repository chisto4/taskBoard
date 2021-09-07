import { actions, ActionBoard } from "./constansBoard"
import { IBoardState } from "../../types/types";

const initialState: IBoardState = {
    board: [],
    column: [],
    task: [],
    clickBoardId: undefined,
}


export const boardReducer = (state = initialState, action: ActionBoard): IBoardState => {
    switch (action.type) {
        case actions.CREATE_BOARD:
            return { ...state, board: [...state.board, action.payload] }
        case actions.UPDATE_BOARD:
            return {
                ...state,
                board: state.board.map((i) => {
                    if (i.id === action.payload.id) {
                        return action.payload
                    }
                    return i
                })
            }
        case actions.GET_ALL_BOARD:
            return { ...state, board: action.payload }

        case actions.DELETE_BOARD:
            return {
                ...state,
                board: state.board.filter(i => i.id !== action.payload.id)
            }

        //COLUMN
        case actions.CREATE_COLUMN:
            return { ...state, column: [...state.column, action.payload] }


        // case actions.CHOICE_BOARD:
        //     return { ...state, clickBoardId: [...state.clickBoardId, action.payload] }

        case actions.UPDATE_COLUMN:
            return {
                ...state,
                column: state.column.map((i) => {
                    if (i.id === action.payload.id) {
                        return action.payload
                    }
                    return i
                })
            }

        case actions.GET_ALL_COLUMN:
            return { ...state, column: action.payload }

        case actions.DELETE_COLUMN:
            return {
                ...state,
                column: state.column.filter(i => i.id !== action.payload.id)
            }

        //TASK
        case actions.CREATE_TASK:
            return {
                // ...state, task: [...state.task, action.payload] }
                ...state,
                column: state.column.map(item => {
                    if (item.id === action.payload.columnId) {
                        if (item.Tasks) {
                            item.Tasks.push(action.payload)
                        } else {
                            item = {
                                ...item,
                                Tasks: [action.payload]
                            }
                        }
                    }
                    return item
                })
            }


        case actions.UPDATE_TASK:
            return {
                ...state,
                column: {
                    ...state.column,
                            //@ts-ignore
                    column,[action.payload.columnIndex]:Tasks[action.payload.taskIndex]
                  = action.payload.task}
            }

        case actions.GET_ALL_TASK:
            return { ...state, task: action.payload }

        case actions.DELETE_TASK:
            return {
                ...state,
                column: state.column.map(item => {
                    return {
                        ...item,
                        Tasks: item.Tasks?.filter(task => task.id !== action.payload.id),
                    };
                })
            }
        default:
            return state
    }

}

