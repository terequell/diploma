import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Registration from 'components/Registration';
import Home from 'components/Home';
import Login from 'components/Login';

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Registration} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
