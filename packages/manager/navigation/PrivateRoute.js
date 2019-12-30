import React, { Component } from 'react';
import { Route, Redirect } from './routing';
import { connect } from 'react-redux';

function PrivateRoute({
  component: Component,
  authenticated,
  navigation,
  componentProps,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          <Component {...props} {...componentProps} navigation={navigation} />
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
  authenticated: state.authentication.authenticated,
});

export default connect(mapStateToProps, null)(PrivateRoute);
