import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';

const AppRouter = () => (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </BrowserRouter>
  );

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(AppRouter);
