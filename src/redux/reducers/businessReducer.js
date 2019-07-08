import { combineReducers } from 'redux';

const businessReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BUSINESS':
      return action.payload;
    default:
      return state;
  }
};

const singleBusiness = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SINGLE_BUSINESS':
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  businessReducer,
  singleBusiness,
});
