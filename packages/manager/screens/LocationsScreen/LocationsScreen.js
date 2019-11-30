import React, { Component } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { Card, Button } from '@ordered.online/components';

function Item({ location }) {
  return (
    <Card title={location.name}>
      <Text style={{ marginBottom: 15 }}>{location.description}</Text>
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
  );
}

export class LocationsScreen extends Component {
  render() {
    const { fetching, locations, error } = this.props;

    if (error !== null) {
      return <Text> An Error occurred: {error} </Text>;
    }

    if (fetching) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
      <SafeAreaView style={styles.container}>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 30,
            marginBottom: 15,
            fontSize: 24,
          }}>
          Overview over all locations
        </Text>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
            marginBottom: 30,
          }}>
          <Button
            title="create new location"
            color="#57c75e"
            onPress={() => this.props.navigation.navigate('locations/create')}
          />
        </View>
        <FlatList
          numColumns={2} // set number of columns
          columnWrapperStyle={styles.row} // space them out evenly
          data={Object.keys(locations)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => console.log('')}>
              <View style={styles.itemWrapper}>
                <Item location={locations[item]} />
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  itemWrapper: {
    flex: 0.5,
  },
});

const mapStateToProps = state => ({
  fetching: state.locations.fetching,
  locations: state.locations.locations,
  error: state.locations.error,
});

export default connect(mapStateToProps, null)(LocationsScreen);
