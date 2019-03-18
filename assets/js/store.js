import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

function tasks(state = [], action) {
  switch (action.type) {
    case 'TASK_LIST':
      return action.data;
    case 'TASK_DELETE':
      return _.filter(state, task => task.id != action.task_id);
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
    default:
      return state;
  }
}

function session(state = null, action) {
  switch (action.type) {
    case 'NEW_SESSION':
      return action.data;
    default:
      return state;
  }
}

let login_form0 = {
  email: '',
  password: ''
};

function login_form(state = login_form0, action) {
  return state;
}

function add_item_forms(state = new Map(), action) {
  switch (action.type) {
    case 'UPDATE_ADD_CART_FORM':
      let state1 = new Map(state);
      state1.set(action.product_id, action.count);
      return state1;
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  console.log('reducer', state0, action);

  let reducer = combineReducers({
    tasks,
    users,
    session,
    login_form,
    add_item_forms
  });
  let state1 = reducer(state0, action);

  console.log('reducer1', state1);

  return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
