import './App.css';
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Circles from './Circles/Circles';
import Profile from './Profile/Profile';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAC, setUserUnauthorized } from './redux/actionCreators/userActionCreators';
import BotTransferPage from './BotTransfer.page/BotTransferPage'

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser)


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
        .catch((err) => dispatch(setUserUnauthorized()));
    }, 500);
  }, [dispatch]);


  if(Object.values(currentUser).length === 0) {
    return (<>123</>);
  }
  
  if(currentUser.status === 'unauthorized') {
    return (<BotTransferPage />);
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/circule">
          <Circles />
        </Route>
        <Route path="/error">123</Route>
        <Route path="/profile/:secretId" children={<Profile />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
