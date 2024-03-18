import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useFocusEffect } from "@react-navigation/native";
import { orderBy, where } from "firebase/firestore";

import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useMemo } from "react";

import useFirebase from "../../hooks/useFirebase";
import { useAuth } from "../../hooks/useAuth";
import { formatTimeFb } from "../../utils";
import { colors } from "../../constants";
import { Button } from "react-native-paper";

const ty = new Date().getDay();

export default function WeeklyReportScreen({ navigation, route }) {
  const { user } = route.params;
  const { getDocuments, updateDocument, addDocument2 } = useFirebase();

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [datePicker, setDatePicker] = React.useState(false);
  const [info, setInfo] = React.useState({});

  useFocusEffect(
    React.useCallback(() => {
      getData();
      // getInData();
    }, [])
  );

  const getData = async () => {
    const today = new Date();
    const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
    const lastDay = new Date(
      today.setDate(today.getDate() - today.getDay() + 6)
    );
    const month = firstDay.getMonth() + 1;
    const year = firstDay.getFullYear();

    const res = await getDocuments("attendance", setLoading, [
      where("userId", "==", user.id),
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
      if (!item.checkOut || !item.checkIn) return;
      const diff = (item.checkOut.toDate() - item.checkIn.toDate()) / 3600000;
      sum += diff;
    });

    return {
      sum: sum,
      average: ty === 0 ? sum / 7 : sum / ty,
    };
  }, [data]);

  const handleSave = async (date) => {
    let prevDate =
      info?.mode === "checkIn"
        ? getTime(info?.checkIn, info?.createdAt)
        : getTime(info?.checkOut, info?.createdAt);

    prevDate.setHours(date.getHours());
    prevDate.setMinutes(date.getMinutes());

    const res = await updateDocument(
      "attendance",
      info.id,
      {
        [info?.mode]: prevDate,
      },
      setLoading
    );

    if (res.error) return;

    getData();
    Alert.alert("Success", "Updated successfully", [
      {
        text: "OK",
      },
    ]);
  };

  const getInData = () => {
    const today = new Date();

    let firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
    let fd = new Date(today.setDate(today.getDate() - today.getDay()));

    const initial = firstDay.getDate() + 1;
    const last = firstDay.getDate() + 8;

    let data = [];
    for (let i = initial; i < last; i++) {
      let date = new Date(firstDay.setDate(i));

      data.push({
        checkIn: "",
        checkOut: "",
        checkouts: [],
        dayname: date.toLocaleDateString("en-US", { weekday: "long" }),
        date: date.toDateString(),
        createdAt: date,
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        userId: user.id,
        nw: true,
      });
    }

    return data;
  };

  const newData = useMemo(() => {
    const dt = getInData();
    let newData = [];

    dt.forEach((item) => {
      const found = data.find((d) => d.date === item.date);
      if (found) {
        newData.push(found);
      } else {
        newData.push(item);
      }
    });

    return newData;
  }, [data]);

  const approveStatus = useMemo(() => {
    const found = data.filter((d) => d.approved === true);
    return found.length === data.length;
  }, [data]);

  const handleNew = async (date) => {
    let prevDate =
      info?.mode === "checkIn"
        ? getTime(info?.checkIn, info?.createdAt, true)
        : getTime(info?.checkOut, info?.createdAt, true);

    prevDate.setHours(date.getHours());
    prevDate.setMinutes(date.getMinutes());

    const res = await addDocument2("attendance", {
      ...info,
      [info?.mode]: prevDate,

      // createdAt:
    });

    if (res.error) return;

    Alert.alert("Success", "Updated successfully", [
      {
        text: "OK",
        onPress: () => {
          setDatePicker(false);
          getData();
        },
      },
    ]);
  };

  const approveAttendance = async () => {
    if (data.length === 0) {
      Alert.alert("Error", "No attendance found");
      return;
    }

    for (let i = 0; i < data.length; i++) {
      const res = await updateDocument(
        "attendance",
        data[i].id,
        {
          approved: true,
        },
        setLoading
      );

      if (res.error) return;
    }

    Alert.alert("Success", "Approved successfully", [
      {
        text: "OK",
        onPress: () => {
          setDatePicker(false);
          getData();
        },
      },
    ]);
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
      }}
    >
      <FlatList
        data={newData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <Option
              // only show day name
              day={item?.dayname}
              checkin={formatTimeFb(item.checkIn)}
              checkout={formatTimeFb(item.checkOut)}
              onPress={(mode) => {
                setInfo({
                  ...item,
                  mode,
                });
                setDatePicker(true);
              }}
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
            <Button
              mode="contained"
              style={{ marginTop: 20 }}
              onPress={() => {
                approveAttendance();
              }}
              buttonColor={colors.secondary}
              loading={loading}
              disabled={loading || approveStatus}
            >
              Approve
            </Button>
          </View>
        }
      />

      <DateTimePickerModal
        isVisible={datePicker}
        mode="time"
        onConfirm={(date) => {
          setDatePicker(false);
          if (!info?.id) {
            handleNew(date);
            return;
          }
          handleSave(date);
        }}
        onCancel={() => {
          setDatePicker(false);
          setInfo({});
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

const Option = ({ day, checkin, checkout, onPress }) => {
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
      <Cell value={checkin} link={true} onPress={() => onPress("checkIn")} />
      <Cell
        value={checkout}
        ta="right"
        br={0}
        link={true}
        onPress={() => onPress("checkOut")}
      />
    </View>
  );
};

const Cell = ({ value, ta = "center", br = 1, link, onPress, data }) => (
  <TouchableOpacity
    style={{ flex: 1, borderRightColor: "lightgrey", borderRightWidth: br }}
    disabled={!link}
    onPress={onPress}
  >
    <Text
      style={{
        fontWeight: "400",
        textAlign: ta,
        color: link ? colors.primary : colors.darkGrey,
      }}
    >
      {value}
    </Text>
  </TouchableOpacity>
);

const getTime = (date, createdAt, nw) => {
  if (!date) return !nw ? createdAt?.toDate() : createdAt;

  return date.toDate();
};
