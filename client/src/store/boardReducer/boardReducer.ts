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

        case actions.UPDATE_INDEX_COLUMN:
            return {
                ...state,
                column: action.payload
            }

        // case action.UPDATE_COLUMN_ARR

        case actions.GET_ALL_COLUMN:
            return { ...state, column: action.payload }

        case actions.CLEARE_CASH_COLUMN:
            return { ...state, column: [] }

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
            const newColState = state.column.slice();
            const newTasks = newColState[action.payload.columnIndex].Tasks.slice();
            newTasks[action.payload.taskIndex] = action.payload.task;
            newColState[action.payload.columnIndex].Tasks = newTasks;

            return {
                ...state,
                column: newColState
                // column: [
                //     ...state.column,
                //     state.column[action.payload.columnIndex] = {
                //         ...state.column[action.payload.columnIndex].Tasks,
                //         Tasks[action.payload.taskIndex]: action.payload.task
                //     }
                // ]

                // column: state.column.map((col, idx) => {
                //     if (idx !== action.payload.columnIndex) return col;
                //     return {
                //         ...col,
                //         Tasks: col.Tasks.map((task, index) => {
                //             if (index !== action.payload.taskIndex) return task;
                //             return action.payload.task
                //         })
                //     } 
                // })
            }
            
        case actions.REORDER_TASK:
            const newColumnState = state.column.slice();
            const newTaskState = newColumnState[action.payload.columnIndex].Tasks = action.payload.task;
            // const [removed] = newTaskState.splice(action.payload.taskIndexStart, 1);
            // newTaskState.splice(action.payload.taskIndexEnd, 0, removed);
            newColumnState[action.payload.columnIndex].Tasks = newTaskState;
                return {
                    ...state,
                        column: newColumnState
            }
            // const reorder = (list, startIndex, endIndex) => {
            //     const result = Array.from(list);
            //     const [removed] = result.splice(startIndex, 1);
            //     result.splice(endIndex, 0, removed);
              
            //     return result;
            //   };

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

