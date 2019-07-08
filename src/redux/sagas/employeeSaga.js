import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addEmployee(action) {
    try {
        console.log('add employee saga');
        console.log(action.payload);
        yield axios.post('api/employee', action.payload);
        // yield put({type: 'FETCH_BUSINESSES', payload: action.payload.userId});
    } catch (error) {
        console.log("Error with adding employee:", error)
    }
}

// action.payload is the user ID
function* fetchEmployees(action) {
    try {
        console.log('fetch employee saga');
        console.log(action.payload);
        const employeesResponse = yield axios.get(`api/employee?id=${action.payload}`); // payload is the user's ID
        console.log(employeesResponse.data);
        yield put ({type: `SET_EMPLOYEES`, payload: employeesResponse.data});
    } catch (error) {
        console.log("Error with fetching employees:", error)
    }
}


function* employeeSaga() {
    yield takeLatest('POST_REGISTER_EMPLOYEE', addEmployee);
    yield takeLatest('FETCH_EMPLOYEES', fetchEmployees);
}

export default employeeSaga;