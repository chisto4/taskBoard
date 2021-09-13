
import axios from '../index';
import { IBoard, IColumn, ITask } from "../../types/types";

export const createBoardApi = async (board: IBoard) => {
  const res = await axios.post('workspace/board', board);
  return res.data
};

export const updateBoardApi = async (board: IBoard) => {
  const res = await axios.put('workspace/board', board);
  return res.data
};

export const getAllBoardsApi = async () => {
  const res = await axios.get('workspace/boards');
  return res.data
};

export const deleteBoardApi = async (board: IBoard) => {
  const res = await axios.delete('workspace/board', { params: board });
  return res.data
};

export const createColumnApi = async (column: IColumn) => {
  const res = await axios.post('/workspace/board/column', column);
  console.log('Column info creating', res.data);
  return res.data
};

export const updateColumnApi = async (column: IColumn) => {
  await axios.put('/workspace/board/column', column);
  return column
};

export const updateIndexColumnApi = async (column: IColumn[]) => {
  await axios.put('/workspace/board/columns', column);
  return column
};

export const getAllColumnsApi = async (column: IColumn) => {
  const res = await axios.get(`/workspace/board/columns/${column.id}`)
  return res.data
};

export const deleteColumnApi = async (column: IColumn) => {
  const res = await axios.delete('/workspace/board/column', { params: column });
  return res.data
};

export const createTaskApi = async (task: ITask) => {
  const res = await axios.post('/workspace/board/column/task', task);
  return res.data
};

export const updateTaskApi = async (task: ITask) => {
  const res = await axios.put('/workspace/board/column/task', task);
  return res.data
};

export const updateTaskPositionApi = async (task: ITask[]) => {
  await axios.put('/workspace/board/column/tasks', task);
  return task
};

export const getAllTaskApi = async (task: ITask) => {
  const res = await axios.get(`/workspace/board/column/tasks/${task.id}`);
  return res.data
};

export const deleteTaskApi = async (task: ITask) => {
  const res = await axios.delete('/workspace/board/column/task', { params: task });
  return res.data
};