import axiosAuth from '../redux/fetches/axiosAuth';
import axiosAuthToken from '../redux/fetches/axiosAuthToken';


export const authFunction = (dispatch) => {
  const path = document.location.pathname.match(/profile\/(.)*/);
    if(path) {
      const secretId = path[0].slice(8);
      dispatch(axiosAuthToken(secretId));
    } else {
      dispatch(axiosAuth())
    }
};
