import './App.css';
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Circles from './Circles/Circles';
import Profile from './Profile/Profile';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserAC } from './redux/actionCreators/userActionCreators';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // axios
    //   .get('http://localhost:4000/circles')
    //   .then((data) => dispatch(initCirculesAC(data.data.data)));

    setTimeout(() => {
      axios
        .get('http://localhost:4000/user/auth', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((res) => dispatch(setUserAC(res.data)))
        .catch((err) => alert('Пожалйста, автовизируйтесь снова.', err));
    }, 500);
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/circule" component={<Circles />} />
        <Route path="/profile/:secretId" children={<Profile />} />
      </Switch>
      <Circles />
    </BrowserRouter>
  );
}

export default App;
