import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppliedRoute, AuthenticatedRoute, UnauthenticatedRoute } from './components/Routes';
import Home from './containers/Home';
import Login from './containers/Login';
import NotFound from './containers/NotFound';

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps}/>
      <UnauthenticatedRoute path="/login" exact component={Login} appProps={appProps} />
      { /* Finally, catch all unmatched routes */}
      <Route component={NotFound} />
    </Switch>
  );
}
