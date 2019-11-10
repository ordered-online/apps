import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Input from '../../components/Input';
import Button from '../../components/Button';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "", 
      password: "", 
      email: "", 
      first_name: "", 
      last_name: ""
    };
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

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen);
