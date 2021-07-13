import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import testPage from './routes/testPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/testPage"  component={testPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
