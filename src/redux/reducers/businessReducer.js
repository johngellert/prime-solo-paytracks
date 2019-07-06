import { combineReducers } from 'redux';

const businessReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BUSINESS':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
    businessReducer,
});
