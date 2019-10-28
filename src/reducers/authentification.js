// Initial State
const initialState = {
  loggedIn: false,
};

// Reducers (Modifies The State And Returns A New State)
const authentification = (state = initialState, action) => {
  switch (action.type) {
    // Logged In
    case 'LOGGED_IN': {
      return {
        // State
        ...state,
        // Redux Store
        loggedIn: action.payload,
      };
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default authentification;
