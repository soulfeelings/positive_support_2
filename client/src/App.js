import './App.css';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Circles from './Circles/Circles';
import Profile from '../src/Profile/Profile';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAC, setUserUnauthorized } from './redux/actionCreators/userActionCreators';
import BotTransferPage from './BotTransfer.page/BotTransferPage';

function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.currentUser.status);

  useEffect(() => {
      axios
        .get('http://localhost:4000/user/auth', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((res) => dispatch(setUserAC(res.data)))
        .catch((err) => dispatch(setUserUnauthorized()));
  }, [dispatch]);

  return (
    <BrowserRouter>
      {/* {status ? (
        <BotTransferPage />
      ) : ( */}
        <>
          <Switch>
            <Route path="/" children={<Circles />} exact />
            <Route path="/transfer" children={<BotTransferPage />} exact />
            <Route path="/circule" children={<Circles />} />
               <Route path="/profile" children={<Profile />} />
            {/* <Route path="/profile/:secretId" children={<Profile />} /> */}
          </Switch>
        </>
      {/* )} */}
    </BrowserRouter>
  );
}

export default App;
