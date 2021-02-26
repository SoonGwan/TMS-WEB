import React from 'react';
import 'styles/reset.scss';
import * as PAGES from 'page';
import { Switch, Route, Redirect } from 'react-router-dom';
import isTokenEmpty from 'util/Token';

function App() {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            !isTokenEmpty() ? <PAGES.ControlMap /> : <Redirect to="/login" />
          }
        />
        <Route
          exact
          path="/member"
          render={() =>
            !isTokenEmpty() ? <PAGES.Member /> : <Redirect to="/login" />
          }
        />
        <Route exact path="/login" render={() => <PAGES.AuthLogin />} />
        <Route
          exact
          path="/delivery"
          render={() =>
            !isTokenEmpty() ? (
              <PAGES.DeliveryStatus />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/manage"
          render={() =>
            !isTokenEmpty() ? (
              <PAGES.ManageDeliveryList />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </Switch>
    </>
  );
}

export default App;
