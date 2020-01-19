import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Text, ListItem } from '@ordered.online/components';
import { GetAllLocations } from '../../store/locations';

import { primaryColor } from '../../constants/Colors';

export class LocationsScreen extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    this.props.getAllLocations();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem({ item }) {
    const location = this.props.locations[item];
    return (
      <ListItem
        title={location.name}
        subtitle={location.description}
        onPress={() => this.props.navigation.navigate(`locations/${item}`)}
        topDivider
        bottomDivider
        chevron
      />
    );
  }

  render() {
    const { fetching, locations } = this.props;

    const data = Object.keys(locations) || null;

    return (
      <View style={styles.container}>
        <Text h3 h3Style={styles.headline}>
          Overview over all locations
        </Text>
        <View style={styles.createButtonWrapper}>
          <Button
            title="create new location"
            onPress={() => this.props.navigation.navigate('locations/create')}
          />
        </View>
        {fetching ? (
          <ActivityIndicator size="large" color={primaryColor} />
        ) : (
          <FlatList
            keyExtractor={this.keyExtractor}
            data={data}
            renderItem={this.renderItem}
          />
        )}
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
  headline: {
    textAlign: 'center',
    marginVertical: 15,
  },
  createButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
});

const mapStateToProps = state => ({
  fetching: state.locations.fetching,
  locations: state.locations.locations,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllLocations: GetAllLocations,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LocationsScreen);
