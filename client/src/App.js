import './App.css';
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Circles from './Circles/Circles';
import Profile from './Profile/Profile';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAC, setUserUnauthorized } from './redux/actionCreators/userActionCreators';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser)
  const history = useHistory();

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
    return (<></>);
  }
  
  console.log(currentUser);
  if(currentUser.status === 'unauthorized') {
    console.log(1);
    return (<>123</>);
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/circule" component={<Circles />} />
        <Route path="/error">123</Route>
        <Route path="/profile/:secretId" children={<Profile />} />
      </Switch>
      {/* <Circles /> */}
    </BrowserRouter>
  );
}

export default App;
