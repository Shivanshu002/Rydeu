import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class SplashScreen extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.replace('Onboarding');
        }, 3000);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to MyApp</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4F6D7A',
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
});
