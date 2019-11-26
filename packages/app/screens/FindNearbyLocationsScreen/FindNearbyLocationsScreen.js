import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { FindLocationNearby } from '../../store/locations';

export class FindNearbyLocationsScreen extends Component {
  render() {
    return (
      <View>
        <Text></Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.authentication.loggedIn,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      findLocationNearby: FindLocationNearby,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindNearbyLocationsScreen);
