import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Logout } from '../store/authentication';

import NavItem from './NavItem';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.renderPrivateNavigation = this.renderPrivateNavigation.bind(this);
  }

  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    logoutUser: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  renderPrivateNavigation() {
    return (
      <React.Fragment>
        <NavItem
          title="Overview"
          onPress={() => this.props.navigation.navigate('overview')}
        />
        <NavItem title="Logout" onPress={() => this.props.logoutUser()} />
      </React.Fragment>
    );
  }

  renderPublicNavigation() {
    return (
      <React.Fragment>
        <NavItem
          title="Login"
          onPress={() => this.props.navigation.navigate('login')}
        />
        <NavItem
          title="Register"
          onPress={() => this.props.navigation.navigate('register')}
        />
      </React.Fragment>
    );
  }

  render() {
    const { authenticated } = this.props;

    return (
      <View style={styles.navigation}>
        {authenticated
          ? this.renderPrivateNavigation()
          : this.renderPublicNavigation()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navigation: {
    maxWidth: 375,
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
});

const mapStateToProps = state => ({
  authenticated: state.authentication.authenticated,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logoutUser: Logout,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
