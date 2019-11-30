import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Card } from '@ordered.online/components';

export class LocationDetailScreen extends Component {
  render() {
    const { match, locations } = this.props;
    const locationID = match.params.id;

    const location = locations[locationID];

    return (
      <View style={styles.container}>
        <Card title={location.name} containerStyle={styles.containerStyle}>
          <Text style={{ marginBottom: 15 }}>
            {' '}
            {'\n'} Description: {'\n'} {location.description}
          </Text>
          <Text>
            {' '}
            {'\n'} Address: {'\n'} {location.address}
          </Text>
          <Text>
            {' '}
            {'\n'} Latitude: {'\n'} {location.latitude}
          </Text>
          <Text>
            {' '}
            {'\n'} Longitude: {'\n'} {location.longitude}
          </Text>
          <Text>
            {' '}
            {'\n'} Categories: {'\n'}{' '}
          </Text>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            {location.categories.map((category, index) => (
              <View
                key={index}
                style={{
                  flex: 1 / 3,
                  borderRadius: 20,
                  backgroundColor: '#57c75e',
                  margin: 5,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    paddingVertical: 5,
                    color: 'white',
                  }}>
                  {category.name}
                </Text>
              </View>
            ))}
          </View>
          <Text>
            {' '}
            {'\n'} Tags: {'\n'}{' '}
          </Text>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            {location.tags.map((tag, index) => (
              <View
                key={index}
                style={{
                  flex: 1 / 3,
                  borderRadius: 20,
                  backgroundColor: '#57c75e',
                  margin: 5,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    paddingVertical: 5,
                    color: 'white',
                  }}>
                  {tag.name}
                </Text>
              </View>
            ))}
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  containerStyle: {
    flex: 1,
  },
});

const mapStateToProps = state => ({
  locations: state.locations.locations,
});

export default connect(mapStateToProps, null)(LocationDetailScreen);
