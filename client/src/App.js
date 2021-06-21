import './App.css';
import Circles from './Circles/Circles'
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


    </Switch>

 </BrowserRouter>

  );
}

export default App;
