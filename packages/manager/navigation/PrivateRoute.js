import React, { Component } from 'react';
import { Route, Redirect } from './routing';
import { connect } from 'react-redux';

function PrivateRoute({ component: Component, loggedIn, navigation, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Component {...props} navigation={navigation} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = state => ({
  loggedIn: state.authentication.loggedIn,
});

export default connect(mapStateToProps, null)(PrivateRoute);
