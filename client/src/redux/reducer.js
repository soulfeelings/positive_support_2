import {
  ADD_CIRCLE,
  INIT_ADMIN,
  INIT_CIRCLES,
  INIT_ONE_CIRCLE,
  SET_USER,
  UNAUTHORIZED_USER,
  UPDATE_STATE,
} from './actiontypes';

const initialState = {
  circles: [],
  currentUser: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case INIT_CIRCLES:
      return {
        ...state,
        circles: action.payload.data.data,
      };
    case SET_USER:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        currentUser: action.payload.user,
      };
    case UNAUTHORIZED_USER:
      return {
        ...state,
        currentUser: {
          status: 'unauthorized',
        },
      };

    case INIT_ONE_CIRCLE:
      return {
        ...state,
        currentCircle: action.payload,
      };

    case UPDATE_STATE:
      return {
        ...state,
        currentUser: action.payload.user,
        currentCircle: action.payload.circle,
      };

    case INIT_ADMIN:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        currentUser: action.payload.admin,
      };

    case ADD_CIRCLE:
      return {
        ...state,
        circles: [...state.circles, action.payload]
      };

    default:
      return state;
  }
}

export default reducer;
