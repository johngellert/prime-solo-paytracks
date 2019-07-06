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

function* fetchBusinesses(action) {
    try {
        const businessResponse = yield axios.get(`api/business/?id=${action.payload}`);
        yield put({ type: 'SET_BUSINESS', payload: businessResponse.data });
    } catch (error) {
        console.log("Error with fetching businesses:", error)
    }

}

function* businessSaga() {
    yield takeLatest('POST_REGISTER_BUSINESS', addBusiness);
    yield takeLatest('FETCH_BUSINESSES', fetchBusinesses);
}

export default businessSaga;