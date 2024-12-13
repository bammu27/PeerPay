import React from 'react';
import { View, Image, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

function WelcomeScreen({ navigation }) {
    return (
        <ImageBackground
            style={styles.background}
            source={require("../assets/SellerBg1.jpg")}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Image style={styles.logo} source={require("../assets/Logo.png")} />
                <Text style={styles.title}>"Crafting Financial Freedom"</Text>
            </View>

            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.registerButton}
                onPress={() => navigation.navigate('SignUp')}
            >
                <Text style={styles.registerButtonText}>SignUp</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    container: {
        position: "absolute",
        top: 170,
        alignItems: "center",
    },
    logo: {
        width: 250,
        height: 150,
        borderRadius: 15,
    },
    title: {
        color: "white",
        marginTop: 10,
        fontSize: 18,
    },
    loginButton: {
        width: '80%',
        height: 50,
        backgroundColor: "white",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
    },
    registerButton: {
        width: '80%',
        height: 50,
        backgroundColor: "#b19cd9",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
    },
    registerButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
    },
});

export default WelcomeScreen;
