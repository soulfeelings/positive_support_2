// import './App.css';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Circles from './Circles/Circles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAC, setUserUnauthorized } from './redux/actionCreators/userActionCreators';
import BotTransferPage from './BotTransfer.page/BotTransferPage';
import OneCircle from './OneCircle/OneCircle';
import Circle from './Circle/Circle';
import AdminPage from './Admin/AdminPage';
import Profile from './Profile/Profile';
import ProfileCheck from './Profile/ProfileCheck';

function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.currentUser.status);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      axios
        .get('http://localhost:4000/user/auth', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => dispatch(setUserAC(res.data)))
        .catch((err) => dispatch(setUserUnauthorized()));
    } else {
      dispatch(setUserUnauthorized());
    }
  }, [dispatch])

  useEffect(() => {
      
  }, [dispatch]);
  

  useEffect(() => {
    fetch('http://localhost:4000/circle')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'INIT_CIRCLES', payload: { data } }));
  }, [dispatch]);

  return (
    <BrowserRouter>
      {status === "unauthorized"
      ? <BotTransferPage /> 
      : 
        <>
          <Switch>
            
            <Route path="/" children={<Circles />} exact />

            <Route path="/circle/:circleId" children={<OneCircle />} />

            <Route path="/profile" children={<Profile />} exact />
            <Route path="/profile/:secretId" children={<ProfileCheck />} />

            <Route path="/admin" children={<AdminPage />}  />

            <Route path="/unauth" children={<BotTransferPage />} />
          </Switch>
        </>
      }
    </BrowserRouter>
  );
}

export default App;
