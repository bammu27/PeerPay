import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AadhaarVerification = ({ navigation }) => {
  const [aadhaarImage, setAadhaarImage] = useState(null);

  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setAadhaarImage(result.uri);
    }
  };

  const verifyAadhaar = async () => {
    if (!aadhaarImage) {
      Alert.alert("Error", "Please upload an Aadhaar image.");
      return;
    }

    const userId = await AsyncStorage.getItem("userId");
    if (!userId) {
      Alert.alert("Error", "User not logged in. Please log in again.");
      return;
    }

    try {
      const fileData = await FileSystem.readAsStringAsync(aadhaarImage, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const payload = {
        userId,
        aadhaarImage: `data:image/jpeg;base64,${fileData}`,
      };

      const response = await fetch("http://localhost:3000/auth/verify-aadhaar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert("Success", "Aadhaar verified successfully!");
        navigation.navigate("PANVerification");
      } else {
        const errorData = await response.json();
        Alert.alert("Verification Failed", errorData.message || "Something went wrong.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to verify Aadhaar. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aadhaar Verification</Text>
      <Button title="Upload Aadhaar Image" onPress={handleImageUpload} />
      {aadhaarImage && <Text style={styles.imageText}>Image Selected</Text>}
      <Button title="Verify Aadhaar" onPress={verifyAadhaar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  imageText: {
    color: "green",
    marginVertical: 10,
    textAlign: "center",
  },
});