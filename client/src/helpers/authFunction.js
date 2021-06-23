import axios from 'axios';
import { setUserAC } from '../redux/actionCreators/userActionCreators';


export const authFunction = (secretId, dispatch) => {
  
  if (secretId) {
    
    axios
      .post('http://localhost:4000/user/auth', { secretId })
      .then((res) => dispatch(setUserAC(res.data)))
      .then((res) =>  localStorage.setItem('token', res.payload.token))
      .catch((err) => alert('Cсылка неверна или устарела! Пожулайста, запросите новую у бота.'))
      // .then((window.location = 'http://localhost:3000/'));
  }
};
