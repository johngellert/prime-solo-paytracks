import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// action.payload is an object dispatched from the PaymentForm component
// the object has a property of selectedEmployee object, and payment information properties
function* postPayment(action) {
    try {
        console.log('post payment saga');
        console.log(action.payload);
        yield axios.post('api/payment', action.payload);
        console.log('payment posted');
    } catch (error) {
        console.log("Error with adding employee:", error)
    }
}

function* employeeSaga() {
    yield takeLatest('POST_PAYMENT_RECORD', postPayment);
}

export default employeeSaga;