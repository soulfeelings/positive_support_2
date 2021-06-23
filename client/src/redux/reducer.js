import {
  ADD_CIRCLE,
  DELETE_CIRCLE,
  // INIT_ADMIN,
  INIT_ALL_USERS,
  INIT_CIRCLES,
  INIT_ONE_CIRCLE,
  SET_USER,
  UNAUTHORIZED_USER,
  UPDATE_STATE,
  UPDATE_USER,
  REQUEST_UPDATE_SUTUATION,
  REQUEST_UPDATE_SUTUATION_ERROR,
  REQUEST_UPDATE_SUTUATION_SUCCESS,
  CIRCLE_GO_OUT,
} from "./actiontypes";

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

    case ADD_CIRCLE:
      return {
        ...state,
        circles: [...state.circles, action.payload],
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
    case CIRCLE_GO_OUT:
      console.log(state.circles);
      console.log(action.payload);
      return {
        ...state,
        // circles: [...state.circles].filter(
        //   (el) => el._id !== action.payload ),
        currentUser: {
          ...state.currentUser,
          connected_circles: state.currentUser.connected_circles.filter(
            (el) => el._id !== action.payload
          ),
        },
      };

    case DELETE_CIRCLE:
      return {
        ...state,
        circles: action.payload,
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
