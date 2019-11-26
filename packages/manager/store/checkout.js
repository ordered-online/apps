import * as api from '@ordered.online/api';

// Action Types
export const SUBMIT_CHECKOUT_FORM = 'CHECKOUT/SUBMIT_CHECKOUT_FORM';

// Initial State
const initialState = {
  form: null,
  error: null,
};

// Reducer (Modifies The State And Returns A New State)
const checkout = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_CHECKOUT_FORM:
      return { ...state, form: action.payload };

    default:
      return { ...state };
  }
};

// Actions

// Exports
export const submitCheckoutForm = form => ({
  type: SUBMIT_CHECKOUT_FORM,
  payload: form,
});

export const Checkout = form => (dispatch, getState) => {
  dispatch(submitCheckoutForm(form));
};

export default checkout;
