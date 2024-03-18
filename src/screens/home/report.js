import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useMemo } from "react";
import Container from "../../components/container";
import Header from "../../components/header";
import useFirebase from "../../hooks/useFirebase";
import { useAuth } from "../../hooks/useAuth";
import { orderBy, where } from "firebase/firestore";
import { formatTimeFb, getNameInitials } from "../../utils";
import { useFocusEffect } from "@react-navigation/native";
import { colors } from "../../constants";

const ty = new Date().getDay();

export default function WeeklyReportScreen() {
  const { getDocuments } = useFirebase();
  const { profile } = useAuth();

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  const getData = async () => {
    const today = new Date();
    const firstDay = new Date(
      today.setDate(today.getDate() - ((today.getDay() + 6) % 7))
    );

    const lastDay = new Date(
      today.setDate(today.getDate() - today.getDay() + 6)
    );
    const month = firstDay.getMonth() + 1;
    const year = firstDay.getFullYear();

    const res = await getDocuments("attendance", setLoading, [
      where("userId", "==", profile.id),
      where(
        "createdAt",
        ">=",
        new Date(`${year}-${month}-${firstDay.getDate()}`)
      ),
      where(
        "createdAt",
        "<=",
        new Date(`${year}-${month}-${lastDay.getDate()}`)
      ),
      orderBy("createdAt", "asc"),
    ]);

    if (res?.error) return;

    setData(res.data);
  };

  const average = useMemo(() => {
    let sum = 0;
    data.forEach((item) => {
      if (!item.checkOut) return;
      const diff = (item.checkOut.toDate() - item.checkIn.toDate()) / 3600000;
      sum += diff;
    });

    return {
      sum: sum,
      average: ty === 0 ? sum / 7 : sum / ty,
    };
  }, [data]);

  const approveStatus = useMemo(() => {
    const found = data.filter((d) => d.approved === true);
    return found.length === data.length;
  }, [data]);

  return (
    <Container>
      <Header title="Weekly Report" />
      <View style={{ height: 20 }} />
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="small" color={colors.secondary} />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <Option
                // only show day name
                day={item?.dayname}
                checkin={formatTimeFb(item.checkIn)}
                checkout={formatTimeFb(item.checkOut)}
              />
            );
          }}
          ListFooterComponent={
            <View>
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: "bold",
                }}
              >{`Average: ${average.average.toFixed()} Hours per day`}</Text>
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: "bold",
                }}
              >{`Total: ${average.sum.toFixed()} Hours`}</Text>
              {approveStatus && (
                <Text
                  style={{
                    marginTop: 10,
                    fontWeight: "bold",
                    color: colors.secondary,
                  }}
                >
                  Approved
                </Text>
              )}
            </View>
          }
        />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({});

const Option = ({ day, checkin, checkout }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1,
        paddingBottom: 10,
      }}
    >
      <Cell value={day} ta="left" />
      <Cell value={checkin} />
      <Cell value={checkout} ta="right" br={0} />
    </View>
  );
};

const Cell = ({ value, ta = "center", br = 1 }) => (
  <View
    style={{ flex: 1, borderRightColor: "lightgrey", borderRightWidth: br }}
  >
    <Text
      style={{
        fontWeight: "400",
        textAlign: ta,
      }}
    >
      {value}
    </Text>
  </View>
);
