import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addBusiness(action) {
    try {
        console.log('add business saga');
        console.log(action.payload);
        yield axios.post('api/business', action.payload);
        yield put({type: 'FETCH_BUSINESSES', payload: action.payload.userId});
    } catch (error) {
        console.log("Error with adding business:", error)
    }
}

// action.payload is user id
function* fetchBusinesses(action) {
    try {
        // action.payload is a the users id
        // query database to return only business that belong to this user
        const businessResponse = yield axios.get(`api/business/?id=${action.payload}`);
        // businessResponse.data is an array of business objects
        yield put({ type: 'SET_BUSINESS', payload: businessResponse.data });
        if (businessResponse.data.length !== 0) {
            // payload is a single business object at the first index of the array response if not length of zero
            yield put({type: 'FETCH_SINGLE_BUSINESS', payload: businessResponse.data[0]});
        }
        yield put({type:'FETCH_EMPLOYEES', payload: action.payload }); // action.payload is the user id
    } catch (error) {
        console.log("Error with fetching businesses:", error)
    }

}

// action is a single business object dispatched form HomePage when user selects a business
function* fetchSingleBusiness(action) {
    try {
        yield put({type: 'SET_SINGLE_BUSINESS', payload: action.payload});
    } catch (error) {
        console.log("Error with setting single business:", error)
    }
}



function* businessSaga() {
    yield takeLatest('POST_REGISTER_BUSINESS', addBusiness);
    yield takeLatest('FETCH_BUSINESSES', fetchBusinesses);
    yield takeLatest('FETCH_SINGLE_BUSINESS', fetchSingleBusiness);
}

export default businessSaga;