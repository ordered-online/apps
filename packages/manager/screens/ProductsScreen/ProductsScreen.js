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
    const location_id = this.props.match.params.id;
    this.props.getAllproducts(location_id);
  }

  keyExtractor = (item, index) => index.toString();

  renderItem({ item }) {
    const product = this.props.products[item];
    return (
      <ListItem
        title={product.name}
        subtitle={product.description}
        onPress={() => this.props.navigation.navigate(`product/${item}`)}
        topDivider
        bottomDivider
        chevron
      />
    );
  }

  render() {
    const { fetching, products, locations } = this.props;
    const location_id = this.props.match.params.id;
    const location = locations[location_id];

    const data = Object.keys(products) || null;

    return (
      <View style={styles.container}>
        <Text h3 h3Style={styles.headline}>
          Products for {location.name}
        </Text>
        <View style={styles.createButtonWrapper}>
          <Button
            title="create new product"
            onPress={() => this.props.navigation.navigate('products/create')}
          />
        </View>
        {fetching && <ActivityIndicator size="large" color={primaryColor} />}
        <FlatList
          keyExtractor={this.keyExtractor}
          data={data}
          renderItem={this.renderItem}
        />
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
