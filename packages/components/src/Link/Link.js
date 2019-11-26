import React, { Component } from 'react';
import {
  Text,
  Platform,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export class Link extends Component {
  render() {
    const Touchable =
      Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const { onPress, title } = this.props;
    return (
      <View>
        <Touchable onPress={onPress} style={styles.link}>
          <View>
            <Text style={styles.linkText}> {title} </Text>
          </View>
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  link: {
    marginVertical: 15,
  },
  linkText: {
    fontSize: 18,
  },
});

export default Link;
