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

// action.payload is the user ID dispatching from
function* fetchEmployees(action) {
    try {
        console.log('fetch employee saga');
        console.log(action.payload);
        const employeesResponse = yield axios.get(`api/employee?id=${action.payload}`); // payload is the user's ID
        console.log(employeesResponse.data);
        yield put ({type: `SET_EMPLOYEES`, payload: employeesResponse.data});
    } catch (error) {
        console.log("Error with fetching employees:", error);
    }
}

// action.payload is the an updated employee object
function* updateEmployee(action) {
    try{
        console.log('fetch employee saga');
        console.log(action.payload);
        yield axios.put(`api/employee`, action.payload); // updated employee object
        yield put ({type: `FETCH_EMPLOYEES`});
    } catch (error) {
        console.log("Error with updating employee record:", error);
    }
}

// action.payload is and object with the property businessEmployeeID
// id is matches the employee_business table
function* deleteEmployee(action) {
    try {
        yield axios.delete(`api/employee/${action.payload}`);
        yield put ({type: `FETCH_EMPLOYEES`});
    } catch (error) {
        console.log("Error with deleting employee record:", error);
    }
}


function* employeeSaga() {
    yield takeLatest('POST_REGISTER_EMPLOYEE', addEmployee);
    yield takeLatest('FETCH_EMPLOYEES', fetchEmployees);
    yield takeLatest('UPDATE_EMPLOYEE', updateEmployee);
    yield takeLatest('DELETE_EMPLOYEE', deleteEmployee);
}

export default employeeSaga;