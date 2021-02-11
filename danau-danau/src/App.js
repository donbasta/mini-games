import Game from './components/Game.js';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <div className="container">
        <h1>
          danau-danau
        </h1>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <div>
                <Link to="/play">Play!</Link>
              </div>
            </Route>
            <Route exact path="/play">
              <div className="game-wrapper">
                <Game />
              </div>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
