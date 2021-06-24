import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotTransferPage from './BotTransfer.page/BotTransferPage';
import checkBan from './helpers/checkBan';
import fetchInitCircles from './redux/fetches/fetchInitCircles'
import axiosAuth from './redux/fetches/axiosAuth';
import Routes from './Routes';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  
  useEffect(() => dispatch(axiosAuth()), [dispatch]);
  useEffect(() => checkBan(currentUser), [currentUser]);
  useEffect(() => dispatch(fetchInitCircles()), [dispatch]);


  if(!Object.values(currentUser).length) {
    return (<></>);
  }

  return (
    <BrowserRouter>
      {currentUser.status === "unauthorized" || currentUser.isBan
        ? <BotTransferPage /> 
        : <Routes />
      }
    </BrowserRouter>
  );
}

export default App;
