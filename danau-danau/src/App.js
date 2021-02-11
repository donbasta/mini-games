import Game from './components/Game.js';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <code>danau-danau</code>
        </p>
      </header>
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <div className="play-wrapper">
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
