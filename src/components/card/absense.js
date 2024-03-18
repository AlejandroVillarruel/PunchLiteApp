import { useNavigation } from "@react-navigation/native";

import { StyleSheet, View, Text, Alert } from "react-native";
import React from "react";

import { colors } from "../../constants/colors";
import { formatDate } from "../../utils";
import { Button } from "react-native-paper";

export default function abesenseCard({ abesense = {}, updateStatus }) {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={{ fontSize: 14, marginBottom: 5, fontWeight: "bold" }}>
          {abesense?.name}
        </Text>
        <Text style={{ fontSize: 13, marginBottom: 5 }}>{abesense?.email}</Text>
        <Text
          style={{ fontSize: 15, marginBottom: 5, color: colors.secondary }}
        >
          {formatDate(abesense?.startDate)}
          {abesense?.endDate && ` - ${formatDate(abesense?.endDate)}`}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        {["pending"].includes(abesense.status) && (
          <Button
            mode="contained"
            style={[styles.button, { width: "48%" }]}
            onPress={() =>
              Alert.alert(
                "Confirm",
                "Are you sure you want to reject this request?",
                [
                  {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () =>
                      updateStatus(abesense?.id, "rejected", setLoading),
                  },
                ]
              )
            }
            textColor="white"
            buttonColor="red"
            loading={loading}
            disabled={loading}
          >
            Reject
          </Button>
        )}

        {["pending"].includes(abesense.status) && (
          <Button
            mode="contained"
            style={[styles.button, { width: "48%" }]}
            buttonColor="#28a745"
            textColor="white"
            onPress={() =>
              Alert.alert(
                "Confirm",
                "Are you sure you want to approve this request?",
                [
                  {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () =>
                      updateStatus(abesense?.id, "approved", setLoading),
                  },
                ]
              )
            }
            loading={loading}
            disabled={loading}
          >
            Approve
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
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
