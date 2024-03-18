import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { formatTime } from "../../utils";
import Container from "../../components/container";
import { Button, RadioButton } from "react-native-paper";
import { TextInput } from "../../components/form";
import { arrayUnion, where } from "firebase/firestore";
import { useAuth, useFirebase } from "../../hooks";

export default function CheckoutScreen({ navigation }) {
  const { getDocuments, updateDocument } = useFirebase();
  const { profile } = useAuth();

  const [time, setTime] = useState(new Date());
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const checkOut = async () => {
    if (!reason) return Alert.alert("Select at least one option for checkout");

    const attendance = await getDocuments("attendance", setLoading, [
      where("userId", "==", profile.id),
      where("date", "==", new Date().toDateString()),
    ]);

    if (attendance.data.length === 0) return Alert.alert("Not Checked In");

    const data = {
      checkOut: new Date(),
      checkouts: arrayUnion({
        reason,
        notes,
        time: new Date(),
      }),
    };

    const res = await updateDocument(
      "attendance",
      attendance.data[0].id,
      data,
      setLoading
    );

    if (res?.error) return;

    Alert.alert("Checked Out");
    navigation.goBack();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container modal={true}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "500",
          marginBottom: 20,
          color: "#28a745",
          alignSelf: "flex-end",
        }}
      >
        {formatTime(time)}
      </Text>
      <Option
        title="Meal"
        selected={reason === "meal"}
        onPress={() => {
          setReason("meal");
        }}
      />
      <Option
        title="Out"
        selected={reason === "out"}
        onPress={() => {
          setReason("out");
        }}
      />
      <TextInput
        label="Notes"
        value={notes}
        onChangeText={setNotes}
        placeholder="Enter notes here"
        multiline={true}
        style={{ height: 80, textAlignVertical: "top" }}
      />
      <Button
        mode="contained"
        style={{ marginTop: 20 }}
        onPress={() => {
          checkOut();
        }}
        loading={loading}
        disabled={loading}
      >
        Submit
      </Button>
    </Container>
  );
}

const styles = StyleSheet.create({});

const Option = ({ title, selected, onPress }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    }}
  >
    <RadioButton.Android
      value="first"
      status={selected ? "checked" : "unchecked"}
      onPress={onPress}
      uncheckedColor="#28a745"
    />
    <Text style={{ fontSize: 18, fontWeight: "500", color: "#28a745" }}>
      {title}
    </Text>
  </View>
);
