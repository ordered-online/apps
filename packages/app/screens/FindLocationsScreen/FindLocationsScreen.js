import React, { Component } from 'react';
import { Card, View, Platform, FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { FindLocations, FindLocationsNearby } from '../../store/locations';

export class FindLocationsScreen extends Component {
  static navigationOptions = {
    title: 'Find a location',
  };

  constructor(props) {
    super(props);
    this.state = {
      coordinates: null,
      errorMessage: null,
      hasPermissions: false,
    };

    this.getLocationPermissions = this.getLocationPermissions.bind(this);
    this.getLocation = this.getLocation.bind(this);

    this.findLocations = this.findLocations.bind(this);
    this.findLocationsNearby = this.findLocationsNearby.bind(this);
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    }
  }

  async getLocationPermissions() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    } else {
      this.setState({ hasPermissions: true });
    }
  }

  async getLocation() {
    if (!this.state.hasPermissions) {
      await this.getLocationPermissions();
    }
    const coordinates = await Location.getCurrentPositionAsync();
    this.setState({ coordinates });
    this.findLocationsNearby({ coordinates });
  }

  findLocations() {
    // this.props.findLocations();
  }

  findLocationsNearby({ coordinates }) {
    this.props.findLocations({ coordinates });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem({ item }) {
    return <Card />;
  }

  render() {
    return (
      <View>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={data}
          renderItem={this.renderItem}
          numColumns={2}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      findLocations: FindLocations,
      findLocationsNearby: FindLocationsNearby,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(FindLocationsScreen);
