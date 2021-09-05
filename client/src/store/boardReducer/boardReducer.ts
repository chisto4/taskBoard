import { actions, ActionBoard } from "./constansBoard"
import { IBoardState } from "../../types/types";

const initialState: IBoardState = {
    board: [
        {title:'test', id: 1},
        {title:'test', id: 2}
    ],
    column: [
        {id: 1, title: 'test 1', position: 1, boardId: 1},
        {id: 2, title: 'test 2', position: 2, boardId: 1},
        {id: 3, title: 'test 3', position: 3, boardId: 1}
    ],
    task: [
        {id: 1, title: 'test 1', position: 1, description:'text', columnId: 1, priority: 1},
        {id: 2, title: 'test 2', position: 2, description:'text', columnId: 1, priority: 1},
        {id: 3, title: 'test 3', position: 3, description:'text', columnId: 1, priority: 1},

        {id: 1, title: 'test 1', position: 1, description:'text', columnId: 2, priority: 1},
        {id: 2, title: 'test 2', position: 2, description:'text', columnId: 2, priority: 1},
        {id: 3, title: 'test 3', position: 3, description:'text', columnId: 2, priority: 1},

        {id: 1, title: 'test 1', position: 1, description:'text', columnId: 3, priority: 1},
        {id: 2, title: 'test 2', position: 2, description:'text', columnId: 3, priority: 1},
        {id: 3, title: 'test 3', position: 3, description:'text', columnId: 3, priority: 1},
    ],
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
            return { ...state, board:  action.payload }

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
            return { ...state, column:  action.payload }

        case actions.DELETE_COLUMN:
            return {
                ...state,
                column: state.column.filter(i => i.id !== action.payload.id)
                }

                //TASK
        case actions.CREATE_TASK:
            return { ...state, task: [...state.task, action.payload] }

        case actions.UPDATE_TASK:
            return {
                ...state,
                task: state.task.map((i) => {
                    if (i.id === action.payload.id) {
                        return action.payload
                    }
                    return i
                })
            }

        case actions.GET_ALL_TASK:
            return { ...state, task:  action.payload }

        case actions.DELETE_TASK:
            return {
                ...state,
                task: state.task.filter(i => i.id !== action.payload.id)
                }
        default:
            return state
    }                
        
}

