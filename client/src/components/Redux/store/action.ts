import { typesOfAction } from '../constTypesAction';
import { usersInterface, actionInterface } from '../types/types';

export const registrationUsers = (users: usersInterface[]): actionInterface => {
  return {
    type: typesOfAction.REGISTRATION_USER,
    payload: users,
  };
};

export const loginUsers = (users: usersInterface[]): actionInterface => {
  return {
    type: typesOfAction.LOGIN_USER,
    payload: users,
  };
};

export const getOneUser = (users: usersInterface[]): actionInterface => {
  return {
    type: typesOfAction.GET_ONE_USER,
    payload: users,
  };
};

export const updateUser = (user: usersInterface[]): actionInterface => {
  return {
    type: typesOfAction.UPDATE_USER,
    payload: user,
  };
};
                                    
export const deleteUser = (user: usersInterface[]): actionInterface => {
  return {
    type: typesOfAction.DELETE_USER,
    payload: user,
  };
};

export const getToken = (user: usersInterface[]): actionInterface => {
  return {
    type: typesOfAction.GET_TOKEN,
    payload: user,
  };
};

export const updateEmail = (user: usersInterface[]): actionInterface => {
  return {
    type: typesOfAction.UPDATE_USER_EMAIL,
    payload: user,
  };
};