import './App.css';
import Circles from './Circles/Circles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Circles />
    </BrowserRouter>
  );
}

export default App;
