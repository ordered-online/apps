export const SUBMIT_CHECKOUT_FORM = 'CHECKOUT/SUBMIT_CHECKOUT_FORM';

const initialState = {
  form: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_CHECKOUT_FORM:
      return { ...state, form: action.payload };

    default:
      return { ...state };
  }
};

export const submitCheckoutForm = form => ({
  type: SUBMIT_CHECKOUT_FORM,
  payload: form,
});

export const Checkout = form => (dispatch, getState) => {
  dispatch(submitCheckoutForm(form));
};
