// import './App.css';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Circles from './Circles/Circles';
import Profile from './Profile/Profile';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAC, setUserUnauthorized } from './redux/actionCreators/userActionCreators';
import BotTransferPage from './BotTransfer.page/BotTransferPage';
import OneCircle from './OneCircle/OneCircle';
import Circle from './Circle/Circle';
import AdminPage from './Admin/AdminPage';


function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.currentUser.status);
  
  useEffect(() => {
    axios
      .get('http://localhost:4000/user/auth', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((res) =>  dispatch(setUserAC(res.data)))
      .then((res) =>  localStorage.setItem('token', res.payload.token))
      .catch((err) => dispatch(setUserUnauthorized()));
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
              <Route path="/circule" children={<Circles />} />
              <Route path="/circle/:circleId" children={<OneCircle />} />
              <Route path="/admin" children={<AdminPage />}  />
              <Route path="/circleOld/:circleId" children={<Circle />} />
              <Route path="/profile/:secretId" children={<Profile />} />
              {/* Страница теста заглушки */}
              <Route path="/unauth" children={<BotTransferPage />}/>
            </Switch>
          </>
      }
    </BrowserRouter>
  );
}

export default App;
