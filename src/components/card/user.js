import { useNavigation } from "@react-navigation/native";
import UserAvatar from "react-native-user-avatar";

import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

import { colors } from "../../constants/colors";
import { screens } from "../../routes/screens";
import { Button } from "react-native-paper";

export default function UserCard({ user }) {
  const navigation = useNavigation();

  const fullName = user?.firstname + " " + user?.lastname;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate(screens.editUser, {
          user: user,
        })
      }
    >
      <View style={styles.card}>
        {user?.avatar ? (
          <Image
            style={styles.image}
            source={{
              uri: user?.avatar,
            }}
          />
        ) : (
          <UserAvatar size={80} name={fullName} bgColor={colors.secondary} />
        )}
        <View style={{ marginLeft: 10, width: "70%" }}>
          <Text style={{ fontSize: 18, marginBottom: 5, fontWeight: "bold" }}>
            {fullName}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>{user?.email}</Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>{user?.phone}</Text>
          {user?.status === "active" && (
            <Button
              mode="contained"
              onPress={() =>
                navigation.navigate(screens.weeklyReport, {
                  user: user,
                })
              }
              style={{
                padding: 0,
              }}
              buttonColor={colors.secondary}
            >
              Weekly Report
            </Button>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  ticket: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
    margin: 10,
    position: "relative",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  semiCircle1: {
    overflow: "hidden",
    width: 8,
    height: 12,
    position: "absolute",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    borderLeftWidth: 0,
    backgroundColor: "#fff",
    zIndex: 10,
    left: -1,
    bottom: 7,
  },
  semiCircle2: {
    overflow: "hidden",
    width: 8,
    height: 12,
    position: "absolute",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRightWidth: 0,
    backgroundColor: "#fff",
    zIndex: 10,
    right: -1,
    bottom: 7,
  },
});
