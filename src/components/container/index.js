import { Platform, StyleSheet, View } from "react-native";
import React from "react";

export default function Container({ children, cusStyles, modal = false }) {
  return (
    <View
      style={[
        containerStyles.container,
        modal
          ? { paddingTop: Platform.OS === "ios" ? 10 : 30 }
          : {
              paddingTop: Platform.OS === "ios" ? 48 : 30,
            },
        cusStyles,
      ]}
    >
      {children}
    </View>
  );
}

export const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 7,
  },
});
