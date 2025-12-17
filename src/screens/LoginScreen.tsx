import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
    loginFailure,
    loginStart,
    loginSuccess,
} from '../redux/slices/authSlice';
import { AppDispatch, RootState } from '../redux/store';
import { doPost } from '../services';
import { Routes } from '../utils/routers';

const LoginScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<any>();

    const { loading, error } = useSelector(
        (state: RootState) => state.auth
    );

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const loginApi = async () => {
        console.log("trigger");
        const url = `${Routes.url.user.login}`
        const payload = {
            username,
            password,
            expiresInMins: 30,
        };

        try {
            const data = await doPost(url, payload);
            dispatch(loginSuccess(data));
            navigation.replace('Main');
        } catch (err: any) {
            console.log('LOGIN ERROR:', err);
            dispatch(loginFailure('Invalid email or password'));
        }
    }

    const handleLogin = async () => {
        if (!username || !password) {
            dispatch(loginFailure('Please enter email and password'));
            return;
        }
        loginApi()
        dispatch(loginStart());
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assest/login.png')}
                style={styles.image}
                resizeMode="contain"
            />

            <Text style={styles.title}>Login</Text>

            <View style={styles.inputWrapper}>
                <Icon name="mail-outline" size={20} color="#999" />
                <TextInput
                    placeholder="Email ID"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
            </View>

            <View style={styles.inputWrapper}>
                <Icon name="lock-closed-outline" size={20} color="#999" />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Icon
                        name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                        size={20}
                        color="#999"
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgot}>
                <Text style={styles.forgotText}>Forgot?</Text>
            </TouchableOpacity>

            {error && <Text style={styles.error}>{error}</Text>}

            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Login</Text>
                )}
            </TouchableOpacity>

            <Text style={styles.orText}>Or, login with...</Text>

            <View style={styles.socialRow}>
                <TouchableOpacity style={styles.socialBtn}>
                    <Icon name="logo-google" size={22} color="#EA4335" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialBtn}>
                    <Icon name="logo-facebook" size={22} color="#1877F2" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialBtn}>
                    <Icon name="logo-apple" size={22} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.registerRow}>
                <Text>New to iThickLogistics? </Text>
                <TouchableOpacity>
                    <Text style={styles.registerText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    image: {
        height: 200,
        alignSelf: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 24,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 48,
        marginBottom: 16,
    },
    input: {
        flex: 1,
        marginLeft: 8,
    },
    forgot: {
        alignItems: 'flex-end',
        marginBottom: 12,
    },
    forgotText: {
        color: '#1e88e5',
        fontWeight: '500',
    },
    button: {
        height: 48,
        backgroundColor: '#0A66FF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    orText: {
        textAlign: 'center',
        marginVertical: 16,
        color: '#888',
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
    },
    socialBtn: {
        width: 48,
        height: 48,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    registerText: {
        color: '#1e88e5',
        fontWeight: '600',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 8,
    },
});
