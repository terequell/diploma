import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import store from 'redux/store';
import { Provider } from 'react-redux';
import Layout from 'Layout';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Router>
        <Layout />
      </Router>
    </Provider>
  );
}

export default App;
