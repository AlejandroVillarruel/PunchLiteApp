import { AntDesign } from "@expo/vector-icons";

import { View, StyleSheet, TextInput } from "react-native";
import React from "react";

import { colors } from "../../constants";

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search",
  width = "100%",
  cusStyles,
  onFocus,
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 50,
        marginVertical: 10,

        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        width: width,

        alignSelf: "center",
        ...cusStyles,
      }}
    >
      <AntDesign name="search1" size={22} color={colors.primary} />
      <TextInput
        placeholder={placeholder}
        style={{
          flex: 1,
          padding: 0,
          paddingLeft: 10,
          margin: 0,
          fontSize: 16,
          color: colors.grey,
          height: 25,
        }}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        returnKeyType="search"
        placeholderTextColor={colors.grey}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
