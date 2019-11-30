import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Link } from './routing';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const protectedRoutes = [
  {
    path: '/overview',
    title: 'Overview',
  },
  {
    path: '/logout',
    title: 'Logout',
  },
];
const publicRoutes = [
  {
    path: '/login',
    title: 'Login',
  },
  {
    path: '/register',
    title: 'Register',
  },
];

export class Navbar extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
  };

  render() {
    const { loggedIn } = this.props;
    const { isSmallDevice } = Layout;
    const { primaryColor } = Colors;

    let routes;
    if (loggedIn) {
      routes = protectedRoutes;
    } else {
      routes = publicRoutes;
    }

    const navbarStyles = [styles.navbar];
    if (!isSmallDevice) {
      navbarStyles.push({ justifyContent: 'flex-end' });
    }
    const navLinkStyles = [styles.navLink];
    navLinkStyles.push({ backgroundColor: primaryColor });

    return (
      <View style={navbarStyles}>
        <View style={styles.navbarWrapper}>
          {routes.map((route, i) => (
            <View key={i} style={navLinkStyles}>
              <Link
                to={route.path}
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                <Text style={styles.navItem}>{route.title}</Text>
              </Link>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    height: 64,
    display: 'flex',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 1,
  },
  navbarWrapper: {
    maxWidth: 375,
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  navLink: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  navItem: {
    textAlign: 'center',
    fontSize: 18,
    color: '#ffffff',
  },
});

const mapStateToProps = state => ({
  loggedIn: state.authentication.loggedIn,
});

export default connect(mapStateToProps, null)(Navbar);
