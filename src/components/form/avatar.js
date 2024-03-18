import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";

export default function AvatarInput({
  image,
  setImage,
  link,
  resetError,
  error,
}) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      if (resetError) resetError();
      setImage(result.assets[0]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View
          style={{
            borderRadius: 50,
            height: 100,
            width: 100,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F7F7F7",
            borderColor: error ? "red" : "#fff",
            borderWidth: error ? 1 : 0,
          }}
        >
          {image ? (
            <Image source={{ uri: image.uri }} style={styles.image} />
          ) : link ? (
            <Image source={{ uri: link }} style={styles.image} />
          ) : (
            <Ionicons name="md-image-outline" size={50} color="#B2B2B2" />
          )}
        </View>
        <TouchableOpacity style={styles.cameraIcon} onPress={() => pickImage()}>
          <Ionicons name="camera-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: { width: 100, height: 100, borderRadius: 50 },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 5,
  },
});
