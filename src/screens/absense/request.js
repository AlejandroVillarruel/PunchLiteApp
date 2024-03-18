// import DateTimePicker from "@react-native-community/datetimepicker";
import CalendarPicker from "react-native-calendar-picker";

import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "../../components/container";
import Header from "../../components/header";
import { Button } from "react-native-paper";
import { colors } from "../../constants";
import { useAuth } from "../../hooks/useAuth";
import useFirebase from "../../hooks/useFirebase";

export default function RequestAbsenseScreen({ navigation }) {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { profile } = useAuth();
  const { addDocument } = useFirebase();

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      return Alert.alert("Please select start and end date");
    }

    const res = await addDocument(
      "absense",
      {
        userId: profile.id,
        startDate,
        endDate,
        status: "pending",
        name: `${profile.firstname} ${profile.lastname}`,
        email: profile.email,
      },
      setLoading
    );

    if (res?.error) return;

    Alert.alert("Absense request submitted successfully");
    navigation.goBack();
  };

  return (
    <Container>
      <Header title="Request Absense" />
      <View style={{ height: 30 }} />
      <CalendarPicker
        allowRangeSelection={true}
        minDate={new Date()}
        onDateChange={(date, type) => {
          if (type === "END_DATE") {
            setEndDate(date);
          } else {
            setStartDate(date);
          }
        }}
        selectedDayColor={colors.primary}
        selectedDayTextColor="#fff"
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
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
