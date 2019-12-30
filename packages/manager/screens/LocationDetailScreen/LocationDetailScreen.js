import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Text, Icon } from '@ordered.online/components';
import { GetLocation } from '../../store/locations';
import { primaryColor } from '../../constants/Colors';

export class LocationDetailScreen extends Component {
  componentDidMount() {
    const { match } = this.props;
    const location_id = match.params.id;
    this.props.getLocation(location_id);
  }

  render() {
    const { match, locations } = this.props;
    const location_id = match.params.id;
    const location = locations[location_id];

    if (!location) {
      return (
        <View style={styles.container}>
          <Text>Uuups, you were never here !</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.actionsContainer}>
          <Icon
            name={
              Platform.OS === 'ios'
                ? 'ios-arrow-round-back'
                : 'md-arrow-round-back'
            }
            type="ionicon"
            color={primaryColor}
            onPress={() => this.props.navigation.navigate('locations')}
          />
          <Icon
            name={Platform.OS === 'ios' ? 'ios-create' : 'md-create'}
            type="ionicon"
            color={primaryColor}
            onPress={() =>
              this.props.navigation.navigate(`location/edit/${location_id}`)
            }
          />
        </View>
        <Card title={location.name} containerStyle={styles.cardContainer}>
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
  cardContainer: {
    flex: 1,
  },
  actionsContainer: {
    margin: 25,
    marginBottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = state => ({
  locations: state.locations.locations,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getLocation: GetLocation,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationDetailScreen);
