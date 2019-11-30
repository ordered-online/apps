import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Link, Button, Input } from '@ordered.online/components';

import { Register } from '../../store/authentication';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      first_name: '',
      last_name: '',
    };

    this.checkLoggedIn = this.checkLoggedIn.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
  }

  componentDidMount() {
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    const { loggedIn } = this.props;
    if (loggedIn) {
      this.props.navigation.navigate('overview');
    }
  }

  handleRegistration() {
    const { username, password, email, first_name, last_name } = this.state;

    this.props.registerUser({
      username,
      password,
      email,
      first_name,
      last_name,
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
            style={{ textAlign: 'center' }}
          />

          <Input
            editable
            maxLength={40}
            placeholder="email"
            textContentType="emailAddress"
            onChangeText={email => this.setState({ email })}
            style={{ textAlign: 'center' }}
          />

          <Input
            editable
            maxLength={40}
            placeholder="firstname"
            textContentType="givenName"
            onChangeText={first_name => this.setState({ first_name })}
            style={{ textAlign: 'center' }}
          />

          <Input
            editable
            maxLength={40}
            placeholder="lastname"
            textContentType="familyName"
            onChangeText={last_name => this.setState({ last_name })}
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
            title="Register"
            onPress={() => console.warn('Register is not implemented yet')}
          />

          <Link
            title="Already have an account ? Click here to login."
            onPress={() => this.props.navigation.navigate('login')}
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
      registerUser: Register,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
