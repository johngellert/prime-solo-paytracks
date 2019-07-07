import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addEmployee(action) {
    try {
        console.log('add employee saga');
        console.log(action.payload);
        const employeeResponse = yield axios.post('api/employee', action.payload); // returning employee id
        // yield put({type: 'FETCH_BUSINESSES', payload: action.payload.userId});
    } catch (error) {
        console.log("Error with adding employee:", error)
    }
}

// function* fetchBusinesses(action) {
//     try {
//         const businessResponse = yield axios.get(`api/business/?id=${action.payload}`);
//         yield put({ type: 'SET_BUSINESS', payload: businessResponse.data });
//     } catch (error) {
//         console.log("Error with fetching businesses:", error)
//     }

// }

function* employeeSaga() {
    yield takeLatest('POST_REGISTER_EMPLOYEE', addEmployee);
//     yield takeLatest('FETCH_BUSINESSES', fetchBusinesses);
}

export default employeeSaga;