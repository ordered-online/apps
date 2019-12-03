import React, { Component } from 'react';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Logout } from '../../store/authentication';

class LogoutScreen extends Component {
  componentDidMount() {
    this.props.logoutUser();
  }

  render() {
    this.props.logoutUser();
    return <View />;
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logoutUser: Logout,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(LogoutScreen);
