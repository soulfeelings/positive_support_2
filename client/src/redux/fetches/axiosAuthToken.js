import axios from "axios";
import { setUserAC } from "../actionCreators/userActionCreators";

export default function axiosAuthToken(secretId) {
  return (dispatch) => {
    axios
      .post('/user/auth', { secretId })
      .then((res) => dispatch(setUserAC(res.data)))
      .then((res) =>  localStorage.setItem('token', res.payload.token))
      .catch((err) => {
        console.log(err)
        alert('Cсылка неверна или устарела! Пожулайста, запросите новую у бота.', err)
        document.location.assign('/');
      })
  };
}
