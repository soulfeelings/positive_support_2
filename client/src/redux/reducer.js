import {
  ADD_CIRCLE,
  DELETE_CIRCLE,
  INIT_ALL_USERS,
  INIT_CIRCLES,
  SET_USER,
  UNAUTHORIZED_USER,
  UPDATE_STATE,
  UPDATE_USER,
  REQUEST_UPDATE_SUTUATION,
  REQUEST_UPDATE_SUTUATION_ERROR,
  REQUEST_UPDATE_SUTUATION_SUCCESS,
} from "./actiontypes";

const initialState = {
  circles: [],
  currentUser: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {

    // Круговороты
    case INIT_CIRCLES:
      return {
        ...state,
        circles: action.payload.data.data,
      };
    case ADD_CIRCLE:
      return {
        ...state,
        circles: [...state.circles, action.payload],
      };
    case DELETE_CIRCLE:
      return {
        ...state,
        circles: action.payload,
      };
    

    // Пользователи
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload.user,
      };
    case UNAUTHORIZED_USER:
      return {
        ...state,
        currentUser: {
          status: "unauthorized",
        },
      };
    case INIT_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case UPDATE_USER:
      return {
        ...state,
        users: action.payload,
      };


    // Общее - и юзеры и круговроты
    case UPDATE_STATE:
      return {
        ...state,
        currentUser: action.payload.user,
        circles: [...state.circles.map(el => el._id === action.payload.circle._id ? action.payload.circle : el )],
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
      console.log("Ошибка на сервере", action.payload);
      return state;

    default:
      return state;
  }
}

export default reducer;
