import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import { colors } from "../../constants";

const Header = ({ headerRight, title, back = true }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {back ? (
        <TouchableOpacity
          style={styles.headerLeft}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-thin-left" size={24} color={colors.primary} />
        </TouchableOpacity>
      ) : (
        <View style={{ height: 35, width: 35 }} />
      )}
      {title && <Text style={styles.title}>{title}</Text>}
      {headerRight ? (
        headerRight()
      ) : (
        <View
          style={{
            height: 35,
            width: 35,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerLeft: {
    backgroundColor: colors.lightGrey,
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: 20,
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    zIndex: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
    textAlign: "center",
    color: colors.primary,
  },
});

export default Header;
