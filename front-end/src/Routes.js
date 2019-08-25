import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Notes from "./containers/Notes";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import NotFound from "./containers/NotFound";

import Semesters from './containers/semesters';
import SemestersNew from './containers/semesters/new';
import SemesterShow from './containers/semesters/show';

import Students from './containers/students';
import StudentsNew from './containers/students/new';
import StudentsShow from './containers/students/show';

import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/notes/new" exact component={NewNote} props={childProps} />
    <AuthenticatedRoute path="/notes/:id" exact component={Notes} props={childProps} />
    <AuthenticatedRoute path='/semesters/' exact component={Semesters} props={childProps} />
    <AuthenticatedRoute path='/semesters/new' exact component={SemestersNew} props={childProps} />
    <AuthenticatedRoute path='/semesters/:id' exact component={SemesterShow} props={childProps} />
    <AuthenticatedRoute path='/students/' exact component={Students} props={childProps} />
    <AuthenticatedRoute path='/students/new' exact component={StudentsNew} props={childProps} />
    <AuthenticatedRoute path='/students/:id' exact component={StudentsShow} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
