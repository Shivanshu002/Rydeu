import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const OnboardingScreen = (navigation: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Book Your Ride</Text>
            <Text style={styles.subtitle}>
                Safe, fast, and reliable rides anytime, anywhere.
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.replace('Login')}
            >
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E2EAFF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1646e4',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 30,
    },
    features: {
        marginBottom: 40,
    },
    feature: {
        fontSize: 16,
        color: '#333',
        marginVertical: 5,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#1646e4',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 30,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
