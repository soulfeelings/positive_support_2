import axios from "axios";
import { setUserAC, setUserUnauthorized } from "../actionCreators/userActionCreators";

export default function axiosAuth() {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get('http://localhost:4000/user/auth', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => dispatch(setUserAC(res.data)))
        .catch((err) => dispatch(setUserUnauthorized()));
    } else {
      dispatch(setUserUnauthorized());
    }
  };
}
