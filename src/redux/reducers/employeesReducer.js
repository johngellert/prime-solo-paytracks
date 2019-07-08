import { combineReducers } from 'redux';

const employeesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_EMPLOYEES':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  employeesReducer,
});
