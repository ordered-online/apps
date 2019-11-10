import React, { Component } from 'react'
import { Text, Platform, View, TouchableNativeFeedback, TouchableOpacity, StyleSheet } from 'react-native'

import Link from '../../components/Link';

export class AboutScreen extends Component {
    render() {
        const Touchable =
      Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
        return (
            <View style={styles.container}>
                <Link title='Imprint' route='Imprint' navigation={this.props.navigation} />
                <Link title='Privacy Policy ' route='Privacy' navigation={this.props.navigation} />
                <Link title='Terms of Use ' route='Terms' navigation={this.props.navigation} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})


export default AboutScreen
