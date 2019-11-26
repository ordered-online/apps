import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Link, Button, Input } from '@ordered.online/components';

import { Login } from '../../store/authentication';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this._checkLoggedIn();
  }

  // Fetch the token from storage then navigate to our appropriate place if we are already logged in
  _checkLoggedIn = () => {
    const { loggedIn } = this.props;
    if (loggedIn) {
      this.props.navigation.navigate('create/location');
    }
  };

  _handleRegistration = () => {
    const { username, password } = this.state;

    // TODO: implement a simple validation schema

    this.props.registerUser({
      username,
      password,
    });
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Input
            editable
            maxLength={40}
            placeholder="username"
            textContentType="username"
            onChangeText={username => this.setState({ username })}
            style={{ textAlign: 'center' }}
          />

          <Input
            editable
            maxLength={40}
            placeholder="password"
            textContentType="password"
            onChangeText={password => this.setState({ password })}
          />

          <Button
            title="Login"
            onPress={() => console.warn('Login is not implemented yet')}
          />

          <Link
            title="Click Here to Register"
            onPress={() => this.props.navigation.navigate('register')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginHorizontal: 'auto',
    maxWidth: 400,
    position: 'relative',
  },
});

const mapStateToProps = state => ({
  loggedIn: state.authentication.loggedIn,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loginUser: Login,
    },
    dispatch
  );

export default connect(mapStateToProps, null)(LoginScreen);
