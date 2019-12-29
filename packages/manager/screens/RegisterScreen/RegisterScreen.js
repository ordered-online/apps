import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';

import { Button, Input } from '@ordered.online/components';

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

    this.checkauthenticated = this.checkauthenticated.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
  }

  componentDidMount() {
    this.checkauthenticated();
  }

  componentDidUpdate() {
    this.checkauthenticated();
  }

  checkauthenticated() {
    const { authenticated, navigation } = this.props;
    if (authenticated) {
      navigation.navigate('overview');
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
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
            containerStyle={styles.inputContainer}
            leftIcon={
              <AntDesign
                name="user"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
            }
          />

          <Input
            editable
            maxLength={40}
            placeholder="email"
            textContentType="emailAddress"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            containerStyle={styles.inputContainer}
            leftIcon={
              <AntDesign
                name="mail"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
            }
          />

          <Input
            editable
            maxLength={40}
            placeholder="firstname"
            textContentType="givenName"
            value={this.state.first_name}
            onChangeText={first_name => this.setState({ first_name })}
            containerStyle={styles.inputContainer}
            leftIcon={
              <AntDesign
                name="smileo"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
            }
          />

          <Input
            editable
            maxLength={40}
            placeholder="lastname"
            textContentType="familyName"
            value={this.state.last_name}
            onChangeText={last_name => this.setState({ last_name })}
            containerStyle={styles.inputContainer}
            leftIcon={
              <AntDesign
                name="smileo"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
            }
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
            leftIcon={
              <AntDesign
                name="lock"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
            }
          />

          <Button
            containerStyle={{ marginVertical: 20 }}
            title="Register"
            onPress={() => this.handleRegistration()}
          />

          <Button
            type="clear"
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
  error: state.authentication.error,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      registerUser: Register,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
