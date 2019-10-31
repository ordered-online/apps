import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <TextInput
            editable
            maxLength={40}
            placeholder="username"
            textContentType="username"
            onChangeText={username => this.setState({ username })}
            style={styles.textInput}
          />

          <TextInput
            editable
            maxLength={40}
            placeholder="password"
            textContentType="password"
            onChangeText={password => this.setState({ password })}
            style={styles.textInput}
          />

          <Button title="Login" style={{ marginHorizontal: 15 }} />
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
  textInput: {
    marginVertical: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
  },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
