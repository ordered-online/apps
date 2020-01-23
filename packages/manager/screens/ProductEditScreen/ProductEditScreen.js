import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native';
import { Button, Input, Text, Icon } from '@ordered.online/components';
import { GreateProduct, GetProduct, EditProduct } from '../../store/products';

import { primaryColor } from '../../constants/Colors';

export class ProductEditScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Coffee',
      description: 'The elexir of computer scientists.',
      price: '1.80',
      categories: [],
      tags: [],
      additives: [],
      fetching: props.edit ? true : false,
    };

    this.updateStateAfterFetch = this.updateStateAfterFetch.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.edit) {
      const { product_id } = this.props.match.params;
      this.props
        .dispatch(GetProduct(product_id))
        .then(this.updateStateAfterFetch);
    }
  }

  componentWillUnmount() {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
  }

  updateStateAfterFetch() {
    const { product_id } = this.props.match.params;
    const product = this.props.products[product_id];
    if (product) {
      const { name, description, price, categories, tags, additives } = product;
      this.setState({ name, description, price, categories, tags, additives });
    }
  }

  handleFormChange = (key, value) => this.setState({ [key]: value });

  handleFormSubmit() {
    const { location_id } = this.props.match.params;
    const {
      name,
      description,
      price,
      categories,
      tags,
      additives,
    } = this.state;
    const data = {
      location_id,
      name,
      description,
      price,
      categories,
      tags,
      additives,
    };

    if (this.props.edit) {
      const { product_id } = this.props.match.params;
      this.props.editProduct(product_id, data);
    } else {
      this.props.createProduct(data);
    }
  }

  render() {
    const { location_id, product_id } = this.props.match.params;
    const { edit, fetching } = this.props;

    if (edit && fetching) {
      return <ActivityIndicator size="large" color={primaryColor} />;
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Icon
              name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
              type="ionicon"
              color={primaryColor}
              onPress={() =>
                this.props.navigation.navigate(
                  `locations/${location_id}/products/${product_id}`
                )
              }
              iconStyle={styles.backButton}
              containerStyle={styles.iconContainer}
            />
            <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 20 }}>
              Please provide details for your product. {'\n\n'}
            </Text>
          </View>
          <Input
            editable
            autoFocus
            maxLength={40}
            placeholder="Name"
            textContentType="givenName"
            value={this.state.name}
            onChangeText={name => this.handleFormChange('name', name)}
          />
          <Input
            editable
            autoFocus
            multiline
            maxLength={400}
            placeholder="Description"
            textContentType="none"
            onChangeText={description =>
              this.handleFormChange('description', description)
            }
            value={this.state.description}
          />
          <Input
            editable
            autoFocus
            maxLength={40}
            placeholder="Price"
            textContentType="none"
            onChangeText={price => this.handleFormChange('price', price)}
            value={this.state.price}
          />
          <Button
            raised
            color={'#57c75e'}
            titleStyle={{ color: '#fff', padding: 4 }}
            title={edit ? 'Save Product' : 'Create Product'}
            style={styles.button}
            loading={this.props.fetching}
            onPress={this.handleFormSubmit}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    padding: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  backButton: {
    marginLeft: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 64,
    elevation: 0.5,
    width: 30,
    height: 30,
    borderRadius: 12,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = state => ({
  fetching: state.products.fetching,
  products: state.products.products,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      createProduct: GreateProduct,
      editProduct: EditProduct,
    },
    dispatch
  ),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductEditScreen);
