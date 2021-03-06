import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Text, ListItem } from '@ordered.online/components';
import { GetAllLocations } from '../../store/locations';

import Colors from '../../constants/Colors';

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
        <View style={styles.headline}>
          <Text h3>Your Locations</Text>
        </View>
        {fetching && (
          <ActivityIndicator size="large" color={Colors.primaryColor} />
        )}
        <FlatList
          style={styles.listView}
          keyExtractor={this.keyExtractor}
          data={data}
          renderItem={this.renderItem}
        />
        <View style={styles.createButtonWrapper}>
          <Button
            raised
            titleStyle={{ color: '#fff' }}
            title="+ Create new Location"
            onPress={() => this.props.navigation.navigate('locations/create')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    textAlign: 'center',
  },
  listView: {
    flex: 1,
    textAlign: 'left',
    borderRadius: 24,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 64,
    elevation: 0.5,
  },
  createButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headline: {
    marginVertical: 10,
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
