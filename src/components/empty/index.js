import { Button } from "react-native-paper";

import React from "react";
import { StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";

import { colors } from "../../constants";

export default function EmptyData({ text, onPress, loading }) {
  return loading ? (
    <ActivityIndicator
      size="medium"
      color={colors.primary}
      style={{ marginTop: 100 }}
    />
  ) : (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold", color: colors.primary }}>
        {text}
      </Text>
      <Text style={{ fontSize: 14, color: colors.grey, marginTop: 10 }}>
        There is nothing to show here yet.
      </Text>
      <View>
        <Image
          source={require("../../assets/empty.png")}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      </View>

      <Text
        style={{
          fontSize: 14,
          color: colors.grey,
          marginTop: 100,
          textAlign: "center",
        }}
      >
        Drag the screen down or press the button below to refresh.
      </Text>

      <Button
        mode="contained"
        style={{ ...styles.AddBtn }}
        buttonColor={colors.primary}
        onPress={onPress}
      >
        Refresh
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  AddBtn: {
    borderColor: colors.secondary,
    borderRadius: 20,
    marginStart: 5,
    alignSelf: "center",
    marginTop: 10,
  },
});
