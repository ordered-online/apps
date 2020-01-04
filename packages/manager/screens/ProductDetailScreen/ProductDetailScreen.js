import React, { Component } from 'react';
import { View, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Text, Icon } from '@ordered.online/components';
import { GetProduct } from '../../store/products';
import { primaryColor } from '../../constants/Colors';

export class ProductDetailScreen extends Component {
  componentDidMount() {
    const { product_id } = this.props.match.params;
    this.props.getProduct(product_id);
  }

  renderBadges(items) {
    return (
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        {items.map((item, index) => (
          <View key={index} style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{item.name}</Text>
          </View>
        ))}
      </View>
    );
  }

  render() {
    const { fetching, products, locations, match } = this.props;
    const { product_id, location_id } = match.params;
    const product = products[product_id];
    const location = locations[location_id];

    if (fetching) {
      return <ActivityIndicator size="large" color={primaryColor} />;
    }

    if (!product) {
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
            onPress={() =>
              this.props.navigation.navigate(
                `locations/${location_id}/products`
              )
            }
          />
          <Icon
            name={Platform.OS === 'ios' ? 'ios-create' : 'md-create'}
            type="ionicon"
            color={primaryColor}
            onPress={() =>
              this.props.navigation.navigate(
                `locations/${location_id}/products/edit/${product_id}`
              )
            }
          />
        </View>
        <Card title={product.name} containerStyle={styles.cardContainer}>
          <Text style={{ marginBottom: 15 }}>
            {'\n'} Description: {'\n'} {product.description}
          </Text>
          <Text>
            {'\n'} Price: {'\n'} {product.price}
          </Text>
          <Text>
            {'\n'} Categories: {'\n'}{' '}
          </Text>
          {this.renderBadges(product.categories)}
          <Text>
            {'\n'} Tags: {'\n'}{' '}
          </Text>
          {this.renderBadges(product.tags)}
          <Text>
            {'\n'} Additives: {'\n'}{' '}
          </Text>
          {this.renderBadges(product.additives)}
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
  badgeContainer: {
    flex: 1 / 3,
    borderRadius: 20,
    backgroundColor: '#57c75e',
    margin: 5,
  },
  badgeText: {
    textAlign: 'center',
    paddingVertical: 5,
    color: 'white',
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
      getProduct: GetProduct,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailScreen);
