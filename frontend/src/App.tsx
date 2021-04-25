import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import store from 'redux/store';
import { Provider } from 'react-redux';
import Registration from 'components/Registration';
import StartPage from 'components/StartPage';
import Login from 'components/Login';
import Home from 'components/Home';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={StartPage} />
          <Route path="/register" component={Registration} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
