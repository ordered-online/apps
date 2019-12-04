import api from '@ordered.online/api';

// Action Types
export const SUBMIT_PAYMENT = 'PAYMENT/SUBMIT_PAYMENT';
export const COMPLETE_PAYMENT = 'PAYMENT/COMPLETE_PAYMENT';

// Initial State
const initialState = {
  processing: false,
  complete: false,
  error: null,
};

// Reducer (Modifies The State And Returns A New State)
const payment = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_PAYMENT:
      return { ...state, processing: true, complete: false };

    case COMPLETE_PAYMENT:
      return { ...state, processing: false, complete: true };

    default:
      return { ...state };
  }
};

// Actions
const submitPayment = () => ({
  type: SUBMIT_PAYMENT,
});

const completePayment = () => ({
  type: COMPLETE_PAYMENT,
});

// Exports
export const handlePayment = () => (dispatch, getState) => {
  dispatch(submitPayment());
  setTimeout(dispatch(completePayment()), 1000);
};

export default payment;
