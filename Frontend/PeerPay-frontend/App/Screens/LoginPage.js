import React, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

function LoginPage() {
  const [pin, setPin] = useState(['', '', '', '', '', '', '', '']);
  const navigation = useNavigation();

  const handleInputChange = (text, index) => {
    const newPin = [...pin];
    if (/^\d$/.test(text) || text === '') {
      newPin[index] = text;
      setPin(newPin);
      if (text && index < 7) {
        refs[index + 1].focus();
      }
    }
  };

  const handleLogin = () => {
    if (pin.join('').length === 8) {
      Alert.alert('Success', 'Login successful!');
      navigation.navigate('Menu');
    } else {
      Alert.alert('Error', 'Enter all 8 digits of the PIN.');
    }
  };

  const refs = [];

  return (
    
    <ImageBackground style={styles.background} source={require("../assets/SellerBg1.jpg")} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Enter your 8-digit PIN</Text>
        <View style={styles.pinContainer}>
          {pin.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => refs.push(ref)}
              style={styles.inputCircle}
              value={digit}
              onChangeText={(text) => handleInputChange(text, index)}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: {
    alignItems: 'center',
    padding: 20,
    
    },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: 'white' },
  pinContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '80%' },
  inputCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  button: { backgroundColor: '#6200ee', padding: 10, borderRadius: 100, marginTop: 20 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default LoginPage;