import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Button, Input } from '@ordered.online/components';

import { Login } from '../../store/authentication';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'testuser',
      password: '12345678',
    };

    this.checkauthenticated = this.checkauthenticated.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
  }

  componentDidMount() {
    this.checkauthenticated();
  }

  componentDidUpdate() {
    this.checkauthenticated();
  }

  // Fetch the token from storage then navigate to our appropriate place if we are already logged in
  checkauthenticated() {
    const { authenticated, navigation } = this.props;
    if (authenticated) {
      navigation.navigate('locations');
    }
  }

  handleRegistration() {
    const { username, password } = this.state;

    // TODO: implement a simple validation schema

    this.props.loginUser({
      username,
      password,
    });
  }

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
            value={this.state.username}
            containerStyle={styles.inputContainer}
          />

          <Input
            editable
            maxLength={40}
            secureTextEntry={true}
            placeholder="password"
            textContentType="password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            containerStyle={styles.inputContainer}
          />

          <Button
            containerStyle={{ marginVertical: 20 }}
            title="Login"
            loading={this.props.fetching}
            onPress={this.handleRegistration}
          />

          <Button
            type="clear"
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: 400,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '100%',
  },
});

const mapStateToProps = state => ({
  authenticated: state.authentication.authenticated,
  fetching: state.authentication.fetching,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loginUser: Login,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
