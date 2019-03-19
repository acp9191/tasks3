import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

function tasks(state = [], action) {
  switch (action.type) {
    case 'TASK_LIST':
      return action.data;
    case 'TASK_DELETE':
      return _.filter(state, task => task.id != action.task_id);
    case 'TASK_CREATE':
      return _.concat(state, action.data);
    default:
      return state;
  }
}

function task(state = null, action) {
  switch (action.type) {
    case 'TASK_SHOW':
      return action.data;
    case 'TASK_UNSHOW':
      return null;
    default:
      return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
    case 'USER_LIST':
      return action.data;
    case 'USER_DELETE':
      return _.filter(state, user => user.id != action.user_id);
    case 'USER_CREATE':
      return _.concat(state, action.data);
    default:
      return state;
  }
}

function user(state = null, action) {
  switch (action.type) {
    case 'USER_SHOW':
      return action.data;
    case 'USER_UNSHOW':
      return null;
    default:
      return state;
  }
}

function session(state = null, action) {
  switch (action.type) {
    case 'NEW_SESSION':
      return action.data;
    case 'LOGOUT_SESSION':
      return null;
    default:
      return state;
  }
}

function redirect(state = false, action) {
  switch (action.type) {
    case 'REDIRECT_TRUE':
      return true;
    case 'REDIRECT_UNTRUE':
      return false;
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  console.log('reducer', state0, action);

  let reducer = combineReducers({
    tasks,
    task,
    users,
    user,
    session,
    redirect
  });

  let state1 = reducer(state0, action);

  console.log('reducer1', state1);

  return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
