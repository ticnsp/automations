import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppliedRoute, AuthenticatedRoute, UnauthenticatedRoute } from './components/Routes';
import Home from './containers/Home';
import Login from './containers/Login';
import NotFound from './containers/NotFound';

import { CoordinatorList, CoordinatorDetails, CoordinatorNew } from './containers/Coordinators';

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps}/>
      <UnauthenticatedRoute path="/login" exact component={Login} appProps={appProps} />

      <AuthenticatedRoute path="/coordinators" exact component={CoordinatorList} appProps={appProps} />
      <AuthenticatedRoute path="/coordinators/new" exact component={CoordinatorNew} appProps={appProps} />
      <AuthenticatedRoute path="/coordinators/:id" exact component={CoordinatorDetails} appProps={appProps} />
      { /* Finally, catch all unmatched routes */}
      <Route component={NotFound} />
    </Switch>
  );
}
