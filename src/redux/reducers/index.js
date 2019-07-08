import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import business from './businessReducer';
import employees from './employeesReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so or project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  business, // will have an array of business and an object of a single business
  employees, // will have an array of employees
});

export default rootReducer;
