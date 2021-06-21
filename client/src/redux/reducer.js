import { INIT_CIRCLES } from "./actiontypes";

const initialState = {
  users: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case INIT_CIRCLES:
      console.log("init", action.payload.data.data);
      return {
        ...state,
        users: action.payload.data.data,
      };

    default:
      return state;
  }
}

export default reducer;
