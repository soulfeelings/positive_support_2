import './App.css';
import Circles from './Circles/Circles'
import Profile from './Profile/Profile'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BotTransferPage from './BotTransfer.page/BotTransferPage'

function App() {
  return (


 <BrowserRouter>
    <Switch>
      <Route path="/circles" exact>
    <Circles/>
      </Route>
      <Route path="/transfer">
        <BotTransferPage />
      </Route>
        <Route path="/profile">
        <Profile />
      </Route>


    </Switch>

 </BrowserRouter>

  );
}

export default App;
