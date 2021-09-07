
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

//COLUMN

export const createColumnApi = async (column: IColumn) => {
  const res = await axios.post('/workspace/board/column', column);
  console.log('Column info creating', res.data);
  return res.data
};

export const updateColumnApi = async (column: IColumn) => {
  const res = await axios.put('/workspace/board/column', column);
  console.log('Column info updating', res.data);
  return res.data
};

export const getAllColumnsApi = async (column: IColumn) => {
  // const res = await axios.get('/board/columns/', {params: column.id});
  const res = await axios.get(`/workspace/board/columns/${column.id}`)
  console.log('res.data All COLUMNS', res.data)
  return res.data
};

export const deleteColumnApi = async (column: IColumn) => {
  const res = await axios.delete('/workspace/board/column', {params: column});
  console.log('res.data delete board', res.data)
  return res.data
};

//TASK

export const createTaskApi = async (task: ITask) => {
  const res = await axios.post('/workspace/board/column/task', task);
  console.log('Task info creating', res.data);
  return res.data
};

export const updateTaskApi = async (task: ITask) => {
  const res = await axios.put('/workspace/board/column/task', task);
  console.log('Description info updating', res.data);
  return res.data
};

export const getAllTaskApi = async (task: ITask) => {
  // const res = await axios.get('/workspace/board/column/tasks', {params: task});
  const res = await axios.get(`/workspace/board/column/tasks/${task.id}`);
  console.log('res.data All boards', res.data)
  return res.data
};

export const deleteTaskApi = async (task: ITask) => {
  const res = await axios.delete('/workspace/board/column/task', {params: task});
  console.log('res.data delete board', res.data)
  return res.data
};

