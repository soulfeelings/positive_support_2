import {
  INIT_CIRCLES,
  INIT_ONE_CIRCLE,
  SET_USER,
  UNAUTHORIZED_USER,
  UPDATE_STATE,
  REQUEST_UPDATE_SUTUATION,
  REQUEST_UPDATE_SUTUATION_ERROR,
  REQUEST_UPDATE_SUTUATION_SUCCESS,
} from './actiontypes';

const initialState = {
  circles: [],
  currentUser: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case INIT_CIRCLES:
      // console.log('init', action.payload.data.data);
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

    // Ситуация пользователя
    case REQUEST_UPDATE_SUTUATION:
      return state;

    case REQUEST_UPDATE_SUTUATION_SUCCESS:
      return {
        ...state,
        currentUser: { ...state.currentUser, situation: action.payload },
      };

    case REQUEST_UPDATE_SUTUATION_ERROR:
      console.log('Ошибка на сервере', action.payload);
      return state;

    default:
      return state;
  }
}

export default reducer;
