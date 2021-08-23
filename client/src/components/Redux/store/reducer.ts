import { typesOfAction } from '../constTypesAction';
import { usersInterface } from '../types/types';

const defaultState: {users: usersInterface[], authUser: usersInterface | null} = {
  users: [],
  authUser: null,
};

const deleteUser = (currentUser: usersInterface[], allUsers: usersInterface[]) => {
  return allUsers.filter(item => item.email !== currentUser[0].email);
};

const updateUser = (currentUser: usersInterface[], allUsers: usersInterface[]) => {
  return allUsers.map(item => {
    if (item.email !== currentUser[0].email) return item;
    return {
      id: item.id,
      name: currentUser[0].name,
      surname: currentUser[0].surname,
      login: currentUser[0].login,
      dob: currentUser[0].dob,
    };
  });
};

const getOneUser = (currentUser: usersInterface[]) => {
  if (!currentUser[0]) return null;
  return {
    id: currentUser[0].id,
    name: currentUser[0].name,
    surname: currentUser[0].surname,
    login: currentUser[0].login,
    email: currentUser[0].email,
    dob: currentUser[0].dob,
  };
};

export const reducer = (state = defaultState, action: {type: string, payload: usersInterface[] | []}): 
{users: usersInterface[], authUser: usersInterface | null} => {
  switch (action.type) {
  case typesOfAction.REGISTRATION_USER: {
    return { ...state, users: [...state.users, ...action.payload] };
  }

  case typesOfAction.DELETE_USER: {
    const allUsers = deleteUser(action.payload, state.users);
    return { ...state, users: allUsers };
  }

  case typesOfAction.UPDATE_USER: {
    const allUsers = updateUser(action.payload, state.users);
    return { ...state, users: allUsers };
  }

  case typesOfAction.GET_ONE_USER: {
    const user = getOneUser(action.payload);
    return { ...state, authUser: user };
  }
    // break;
  default:
    return state;
  }
};