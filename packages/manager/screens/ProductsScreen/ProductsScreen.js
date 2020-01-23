import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Text, ListItem } from '@ordered.online/components';
import { GetAllProducts } from '../../store/products';

import { primaryColor } from '../../constants/Colors';

export class ProductsScreen extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    const { location_id } = this.props.match.params;
    this.props.getAllProducts(location_id);
  }

  keyExtractor = (item, index) => index.toString();

  renderItem({ item }) {
    const { location_id } = this.props.match.params;
    const product = this.props.products[item];
    return (
      <ListItem
        title={product.name}
        subtitle={product.description}
        onPress={() =>
          this.props.navigation.navigate(
            `locations/${location_id}/products/${item}`
          )
        }
        topDivider
        bottomDivider
        chevron
      />
    );
  }

  render() {
    const { fetching, products, locations, match } = this.props;
    const { location_id } = match.params;
    const location = locations[location_id] || null;

    const data = [];
    if (products) {
      Object.keys(products).forEach(product_id => {
        if (products[product_id].location_id == location_id) {
          data.push(product_id);
        }
      });
    }

    return (
      <View style={styles.container}>
        <Text h3 h3Style={styles.headline}>
          Products for {location.name}
        </Text>
        {fetching && <ActivityIndicator size="large" color={primaryColor} />}
        <FlatList
          style={styles.listView}
          keyExtractor={this.keyExtractor}
          data={data}
          renderItem={this.renderItem}
        />
        <View style={styles.createButtonWrapper}>
          <Button
            raised
            color={'#57c75e'}
            titleStyle={{ color: '#fff', padding: 4 }}
            title="+ Create new Product"
            onPress={() =>
              this.props.navigation.navigate(
                `locations/${location_id}/products/create`
              )
            }
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
  },
  listView: {
    marginHorizontal: 12,
    borderRadius: 24,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 64,
    elevation: 0.5,
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
  fetching: state.products.fetching,
  products: state.products.products,
  locations: state.locations.locations,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllProducts: GetAllProducts,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProductsScreen);
