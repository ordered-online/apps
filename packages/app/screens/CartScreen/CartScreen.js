import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Text, ListItem } from '@ordered.online/components';

import { GetProduct } from '../../store/products';
import { OrderProduct } from '../../store/orders';

import { primaryColor } from '../../constants/Colors';
import { sessionConnect } from '../../store/websocket';

export class CartScreen extends Component {
  static navigationOptions = {
    title: 'Orders',
    headerStyle: {
      backgroundColor: '#f8f8f8',
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
    },
    headerTintColor: '#57c75e',
    headerTitleStyle: {
      fontWeight: '600',
    },
  };

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  keyExtractor = (item, index) => index.toString();

  renderItem({ item }) {
    const product = this.props.products[item];
    return (
      <ListItem
        title={product.name}
        subtitle={product.description}
        topDivider
        bottomDivider
        chevron
        rightIcon={
          <Icon
            name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
            type="ionicon"
            onPress={() => this.props.orderProduct({ item })}
          />
        }
      />
    );
  }

  render() {
    const { fetchingProducts, products, fetchingSession, session } = this.props;

    const data = [];

    if (session) {
      const { orders = [] } = session;

      if (orders && Array.isArray(orders)) {
        orders.forEach(order => {
          const { product_id } = order;
          if (products.hasOwnProperty(product_id)) {
            data.push(product_id);
          } else {
            this.props.getProduct(product_id);
          }
        });
      }
    }

    if (fetchingProducts || fetchingSession) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={primaryColor} />{' '}
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.listView}
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
    alignItems: 'center',
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
});

const mapStateToProps = state => ({
  session: state.orders.session,
  fetchingSession: state.orders.fetching,
  products: state.products.products,
  fetchingProducts: state.products.fetching,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      orderProduct: OrderProduct,
      getProduct: GetProduct,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
