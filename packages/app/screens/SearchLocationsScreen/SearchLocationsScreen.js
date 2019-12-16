import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Input } from '@ordered.online/components';
import { FindLocation } from '../../store/locations';

class SearchLocationsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      category: '',
      tag: '',
    };
  }

  render() {
    return (
      <View>
        <Button
          title="Find Locations Nearby"
          onPress={() => this.props.navigation.navigate('FindNearby')}
        />

        <Input
          editable
          maxLength={40}
          placeholder="Name"
          textContentType="name"
          onChangeText={name => this.setState({ name })}
          style={{ textAlign: 'center' }}
        />

        <Button
          color="#57c75e"
          title="Search"
          onPress={() => console.warn('Search is not implemented yet')}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      findLocation: FindLocation,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(SearchLocationsScreen);
