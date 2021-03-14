import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Registration from './Registration';
import Home from './Home';

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">
          <Registration />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
