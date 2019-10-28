export const SUBMIT_PAYMENT = 'PAYMENT/SUBMIT_PAYMENT';
export const COMPLETE_PAYMENT = 'PAYMENT/COMPLETE_PAYMENT';

const initialState = {
  processing: false,
  complete: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_PAYMENT:
      return { ...state, processing: true, complete: false };

    case COMPLETE_PAYMENT:
      return { ...state, processing: false, complete: true };

    default:
      return { ...state };
  }
};
