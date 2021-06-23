import { INIT_CIRCLES, INIT_ONE_CIRCLE, SET_USER, UNAUTHORIZED_USER, UPDATE_STATE, CIRCLE_GO_OUT } from './actiontypes';

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
          status: "unauthorized",
        }
      }

    case INIT_ONE_CIRCLE:
      return {
        ...state,
        currentCircle: action.payload
      }
    case CIRCLE_GO_OUT:
      console.log(state.circles);
      console.log(action.payload);
      return {
        ...state,
        // circles: [...state.circles].filter(
        //   (el) => el._id !== action.payload ),
          currentUser: {
            ...state.currentUser,
            connected_circles: state.currentUser.connected_circles.filter(el=> el._id !== action.payload)
          }

      }



      case UPDATE_STATE:
        return {
          ...state,
          currentUser: action.payload.user,
          currentCircle: action.payload.circle
        }

    default:
      return state;
  }
}

export default reducer;
