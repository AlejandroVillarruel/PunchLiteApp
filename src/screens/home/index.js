import { MaterialCommunityIcons, Feather, AntDesign } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";

import {
  Alert,
  ActivityIndicator,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import Container from "../../components/container";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../routes/screens";
import { useAuth, useFirebase } from "../../hooks";
import { getAvatarUrl } from "../../utils";
import { colors } from "../../constants";
import { where } from "firebase/firestore";

export default function HomeScreen({ navigation }) {
  const { showActionSheetWithOptions } = useActionSheet();
  const { profile } = useAuth();
  const { addDocument, updateDocument, getDocuments } = useFirebase();

  const onPress = () => {
    const options = ["Email", "Phone", "Cancel"];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            Linking.openURL("mailto:alejadrovilla@gmail.com");
            break;
          case 1:
            Linking.openURL("tel:+8176090852");
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };

  const checkIn = async (setLoading) => {
    if (setLoading) setLoading(true);
    const data = {
      checkIn: new Date(),
      dayname: new Date().toLocaleDateString("en-US", { weekday: "long" }),
      date: new Date().toDateString(),
      day: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      userId: profile.id,
      checkouts: [],
    };

    const attendance = await getDocuments("attendance", setLoading, [
      where("userId", "==", profile.id),
      where("date", "==", new Date().toDateString()),
    ]);

    if (attendance.data.length > 0) return Alert.alert("Already Checked In");

    const res = await addDocument("attendance", data, setLoading);

    if (res?.error) return;

    Alert.alert("Checked In");
  };

  return (
    <Container>
      <View style={{ flex: 1, paddingTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontSize: 20, fontWeight: "600", color: colors.secondary }}
          >
            Welcome, {profile?.firstname}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(screens.editProfile);
            }}
          >
            <Image
              source={getAvatarUrl(profile.avatar)}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          </TouchableOpacity>
        </View>
        <Button
          color="#ffc107"
          title="Check In"
          icon={
            <MaterialCommunityIcons name="clock-in" size={40} color="#fff" />
          }
          onPress={checkIn}
        />
        <Button
          color="#dc3545"
          title="Check Out"
          icon={
            <MaterialCommunityIcons name="clock-out" size={40} color="#fff" />
          }
          screen={screens.checkout}
        />
        <Button
          color="#17a2b8"
          title="Request Absence"
          icon={
            <MaterialCommunityIcons
              name="application-edit-outline"
              size={30}
              color="#fff"
            />
          }
          screen={screens.requestAbsense}
        />
        <Button
          color="#28a745"
          title="Weekly Report"
          icon={<Feather name="clipboard" size={30} color="#fff" />}
          screen={screens.weeklyReport}
        />

        <TouchableOpacity
          style={{
            backgroundColor: "#007bff",
            padding: 10,
            borderRadius: 50,
            marginBottom: 10,
            position: "absolute",
            bottom: 20,
            right: 5,
          }}
          onPress={onPress}
        >
          <AntDesign name="contacts" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({});

const Button = ({ color, title, icon, screen, onPress }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  return (
    <TouchableOpacity
      style={{
        backgroundColor: color,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        height: 100,
        justifyContent: "space-between",
      }}
      onPress={() => {
        onPress ? onPress(setLoading) : navigation.navigate(screen);
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            color: "white",
            fontSize: 18,
          }}
        >
          {title}
        </Text>
        <ActivityIndicator
          animating={loading}
          color="#fff"
          size="small"
          style={{ marginLeft: 10 }}
        />
      </View>
      <View style={{ alignSelf: "flex-end" }}>{icon}</View>
    </TouchableOpacity>
  );
};
