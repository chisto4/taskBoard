
import { IBoard, IColumn, ITask } from "../../types/types";
import axios from '../index';

//BOARDS

export const createBoardApi = async (board: IBoard) => {
  const res = await axios.post('workspace/board', board);
  console.log('Board info creating', res.data);
  return res.data
};

export const updateBoardApi = async (board: IBoard) => {
  const res = await axios.put('workspace/board', board);
  console.log('Board info updating', res.data);
  return res.data
};

export const getAllBoardsApi = async () => {
  const res = await axios.get('workspace/boards');
  console.log('res.data All boards', res.data)
  return res.data
};

export const deleteBoardApi = async (board: IBoard) => {
  const res = await axios.delete('workspace/board', { params: board });
  console.log('res.data delete board', res.data)
  return res.data
};

// //COLUMN

// export const createColumnApi = async (column: IColumn) => {
//   const res = await axios.post('/board/column', column);
//   console.log('column info creating', res.data);
//   return res.data
// };

// export const updateColumnApi = async (column: IColumn) => {
//   const res = await axios.put('/board/column', column);
//   console.log('Board info updating', res.data);
//   return res.data
// };

// export const getAllColumnsApi = async (column: IColumn) => {
//   const res = await axios.get('/board/columns', column);
//   console.log('res.data All boards', res.data)
//   return res.data
// };

// export const deleteColumnApi = async (column: IColumn) => {
//   const res = await axios.delete('/board/column', column);
//   console.log('res.data delete board', res.data)
//   return res.data
// };

// //TASK

// export const createTaskApi = async (task: ITask) => {
//   const res = await axios.post('/board/column/task', task);
//   console.log('Board info creating', res.data);
//   return res.data
// };

// export const updateTaskApi = async (task: ITask) => {
//   const res = await axios.put('/board/column/task', task);
//   console.log('Board info updating', res.data);
//   return res.data
// };

// export const getAllTaskApi = async (task: ITask) => {
//   const res = await axios.get('/board/board/columns', task);
//   console.log('res.data All boards', res.data)
//   return res.data
// };

// export const deleteTaskApi = async (task: ITask) => {
//   const res = await axios.delete('/board/column/task', task);
//   console.log('res.data delete board', res.data)
//   return res.data
// };

