import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { FindLocationNearby } from '../../store/locations';

export class FindNearbyLocationsScreen extends Component {
  constructor(props) {
    super(props);
    state = {
      location: null,
      errorMessage: null,
    };

    this.getLocationPermissions = this.getLocationPermissions.bind(this);
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this.getLocationPermissions();
    }
  }

  async getLocationPermissions() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
  }

  async getLocation() {
    let location = await Location.getCurrentPositionAsync();
    this.setState({ location });
  }

  render() {
    return (
      <View>
        <Text></Text>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      findLocationNearby: FindLocationNearby,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(FindNearbyLocationsScreen);
