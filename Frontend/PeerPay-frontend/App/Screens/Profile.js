// App/Screens/Profile.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

function Profile() {
    const navigation = useNavigation(); // Access navigation

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Menu')}>
                        <Image source={require('../assets/Back.png')} style={styles.backImage} />
                    </TouchableOpacity>
                </View>

                {/* Profile Photo Card */}
                <View style={styles.profileCard}>
                    <Image source={require('../assets/profile.png')} style={styles.profilePic} />
                    <Text style={styles.profileName}>Abubaqar Mulla</Text>
                </View>

                {/* Profile Details Section */}
                <View style={styles.detailsCard}>
                    <Text style={styles.detailsText}>Phone Number: +91 1234567890</Text>
                </View>
                <View style={styles.detailsCard}>
                    <Text style={styles.detailsText}>Address: 123 Main Street, City, Country</Text>
                </View>
                <View style={styles.detailsCard}>
                    <Text style={styles.detailsText}>Aadhaar Number: 1234 5678 9123</Text>
                </View>
                <View style={styles.detailsCard}>
                    <Text style={styles.detailsText}>PAN Card Number: ABCDE1234F</Text>
                </View>
            </ScrollView>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('Menu')}>
                    <Text style={styles.bottomButtonText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('Profile')}>
                    <Text style={styles.bottomButtonText}>Upload </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('Settings')}>
                    <Text style={styles.bottomButtonText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('Notifications')}>
                    <Text style={styles.bottomButtonText}>NFT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('Support')}>
                    <Text style={styles.bottomButtonText}>Support</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eafbfa',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    backImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginRight: 10,
    },
    profileCard: {
        alignItems: 'center',
        backgroundColor: '#288885',
        borderRadius: 20,
        margin: 15,
        padding: 20,
        elevation: 3, // For shadow on Android
        shadowColor: '#000', // For shadow on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    profilePic: {
        width: 150,
        height: 150,
        borderRadius: 50,
        borderColor: 'gray',
        
        marginBottom: 10,
    },
    profileName: {
        fontSize: 18,
        
        color: 'White',
        
    },
    detailsCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        margin: 15,
        padding: 20,
        elevation: 3, // For shadow on Android
        shadowColor: '#000', // For shadow on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    detailsText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        fontFamily: 'Courier New',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        padding: 10,
    },
    bottomButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    bottomButtonText: {
        color: 'grey',
        fontSize: 14,
        fontWeight: '500',
    },
});

export default Profile;
