// App/Screens/Menu.js

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function HomeScreen({ navigation }) {
    // Dummy data for images in the slider (you can replace it with actual images)
    const images = [
        { id: '1', source: require('../assets/image1.jpeg') },
        { id: '2', source: require('../assets/image2.jpeg') },
        { id: '3', source: require('../assets/image3.jpeg') },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide logic
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Top Header with Profile and Support Links */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Profile')}>
                    <Image
                        source={require('../assets/profile.png')} // Replace with your profile image path
                        style={styles.profileImage} // Specific style for the profile image
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.link}>
                    <Image
                        source={require('../assets/support.png')} // Replace with your support image path
                        style={styles.supportImage}  // Specific style for the support image
                    />
                </TouchableOpacity>
            </View>

            {/* Slider Container */}
            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                <View style={styles.imageWrapper}>  {/* Wrapper for image */}
                    <Image source={images[currentIndex].source} style={styles.sliderImage} />
                </View>
            </ScrollView>

            {/* Square Buttons Section */}
            <View style={styles.gridContainer}>
                <View style={styles.containerItem}>
                    <Text style={styles.containerText}>Peer List</Text>
                </View>
                <View style={styles.containerItem}>
                    <Text style={styles.containerText}>
                        Account Balance:{"\n"}
                        20000
                    </Text>
                </View>
                <View style={styles.containerItem}>
                    <Text style={styles.containerText}>Send Money</Text>
                </View>
                <View style={styles.containerItem}>
                    <Text style={styles.containerText}>Request</Text>
                </View>
            </View>

            {/* Bottom Navigation Buttons */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('Home')}>
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
        justifyContent: 'space-between',
        padding: 5,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    profileImage: {
        width: 45,  // Profile image width
        height: 45, // Profile image height
        resizeMode: 'contain', // Ensure the image fits within the bounds
        marginRight: 10, // Example: Add some margin if needed
        borderColor: 'black', // Border color for the image
        borderWidth: 1,  // Border width should be a number, not a string
        borderRadius: 100,
    },
    supportImage: {
        width: 35,  // Support image width
        height: 35, // Support image height
        resizeMode: 'contain', // Ensure the image fits within the bounds
        marginLeft: 10,  // Example: Add some margin if needed
    },
    squareButton: {
        width: '48%',  // Make each button take 48% of the width (to fit 2 in a row)
        height: 80,
        backgroundColor: '#6200EE',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,  // Space between rows
    },
    squareButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',  // To make the containers spread across the width
        padding: 10,
        width: '100%',  // Make the container fit the screen width
    },
    containerItem: {
        width: '48%',  // Make each container take 48% of the width (to fit 2 in a row)
        height: 230,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center', // If you want to vertically center text within the container
        alignItems: 'flex-start', // Align text to the left horizontally
        borderWidth: 0.5,
        borderColor: 'grey',
        marginBottom: 10,  // Space between rows
    },
    containerText: {
        color: 'Black',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'left', // Align the text to the left
        paddingLeft: 10,
        fontFamily: 'Courier New', // For iOS and Android (if available)
    },
    link: {
        paddingHorizontal: 15,
    },
    linkText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#6200EE',
    },
    sliderImage: {
        width: 280,
        height: 200,
        borderRadius: 10,
        marginHorizontal: 10,
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
    imageWrapper: {
        width: 400, // Adjust this based on your design
        height: 200, // Adjust this based on your design
        backgroundColor: '#288885', 
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,  // Padding for the image inside the container
        paddingLeft: 10,
        paddingRight: 20,
    },
    sliderImage: {
        width: '100%', // Ensure the image fits the container
        height: '100%', // Ensure the image fits the container
        borderRadius: 20,
    },
});

export default HomeScreen;
