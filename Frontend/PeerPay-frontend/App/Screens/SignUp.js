import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const SignUP = ({ navigation }) => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState(new Date());
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  
  const [panCard, setPanCard] = useState("");
  const [aadharCard, setAadharCard] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");

  const handleSignUp = async () => {
    try {
      const user = {
        name,
        dob: dob.toISOString().split("T")[0],
        phone,
        email,
        pan: panCard,
        aadhaar: aadharCard.replace(/\s/g, ""),
        address: { street, city, state, pincode: pinCode },
      };
  
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      const data = await response.json();
  
      if (response.status === 201) {
        await AsyncStorage.setItem("userId", data.userId);
        Alert.alert("Success", data.message, [
          { text: "OK", onPress: () => navigation.navigate("AdhaarVerification") },
        ]);
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to register. Please try again.");
    }
  };
  

  const handlePhoneChange = (text) => {
    if (/^\d*$/.test(text) && text.length <= 10) {
      setPhone(text);
    }
  };

  const handlePinCodeChange = (text) => {
    if (/^\d*$/.test(text) && text.length <= 6) {
      setPinCode(text);
    }
  };

  const formatAadharCardNumber = (text) => {
    const cleaned = text.replace(/\D/g, "");
    const formatted = cleaned
      .match(/.{1,4}/g)
      ?.join(" ")
      .slice(0, 14);
    return formatted || "";
  };

  const handleAadharChange = (text) => {
    setAadharCard(formatAadharCardNumber(text));
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/SellerBg1.jpg")}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Register</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDobPicker(true)}
        >
          <Text>{dob.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDobPicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selectedDate) => {
              setShowDobPicker(false);
              if (selectedDate) {
                setDob(selectedDate);
              }
            }}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          onChangeText={handlePhoneChange}
          keyboardType="numeric"
          maxLength={10}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

      

        <TextInput
          style={styles.input}
          placeholder="PAN Card Number"
          value={panCard}
          onChangeText={setPanCard}
          maxLength={10}
        />

        <TextInput
          style={styles.input}
          placeholder="Aadhar Card Number"
          value={aadharCard}
          onChangeText={handleAadharChange}
          keyboardType="numeric"
          maxLength={14}
        />

        <TextInput
          style={styles.input}
          placeholder="State"
          value={state}
          onChangeText={setState}
        />

        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />

        <TextInput
          style={styles.input}
          placeholder="Street"
          value={street}
          onChangeText={setStreet}
        />

        <TextInput
          style={styles.input}
          placeholder="Pin Code"
          value={pinCode}
          onChangeText={handlePinCodeChange}
          keyboardType="numeric"
          maxLength={6}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#6200EE",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  button: {
    backgroundColor: "#6200EE",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SignUP;
