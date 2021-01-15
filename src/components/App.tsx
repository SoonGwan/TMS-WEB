import React from 'react';
import 'styles/reset.scss';
import * as PAGES from 'page';
import { Switch, Route, Redirect } from 'react-router-dom';
import tokenEmpty from 'util/Token';

function App() {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            !tokenEmpty() ? <PAGES.ControlMap /> : <Redirect to="/login" />
          }
        />
        <Route
          exact
          path="/member"
          render={() =>
            !tokenEmpty() ? <PAGES.Member /> : <Redirect to="/login" />
          }
        />
        <Route exact path="/login" render={() => <PAGES.AuthLogin />} />
        <Route
          exact
          path="/delivery"
          render={() =>
            !tokenEmpty() ? <PAGES.DeliveryStatus /> : <Redirect to="/login" />
          }
        />
        <Route
          exact
          path="/manage"
          render={() =>
            !tokenEmpty() ? (
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
