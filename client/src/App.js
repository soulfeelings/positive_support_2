import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotTransferPage from './BotTransfer.page/BotTransferPage';
import checkBan from './helpers/checkBan';
import fetchInitCircles from './redux/fetches/fetchInitCircles'
import Routes from './Routes';
import { authFunction } from './helpers/authFunction';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const circles = useSelector((state) => state.circles);
  
  useEffect(() => authFunction(dispatch), [dispatch]);
  useEffect(() => checkBan(currentUser), [currentUser]);
  useEffect(() => dispatch(fetchInitCircles()), [dispatch]);

  //  Не рендерим ничего пока не подгрузим - авторизацю и стейт круговоротов
  if(!Object.values(currentUser).length || !circles.length) {
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
