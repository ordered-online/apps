import React, { Component } from 'react';
import {
  ThemeProvider,
  Button as ReactNativeElementsButton,
} from 'react-native-elements';

const theme = {
  colors: {
    primary: '#57c75e',
  },
};

export default class Button extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ReactNativeElementsButton {...this.props} />
      </ThemeProvider>
    );
  }
}
