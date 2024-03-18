import { Button } from "react-native-paper";

import { Alert, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { TextInput } from "../../components/form";
import Container from "../../components/container";
import Header from "../../components/header";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import { useAuth } from "../../hooks";
import DecodeError from "../../utils/decodeError";

export default function UpdatePasswordScreen({ navigation }) {
  const user = auth.currentUser;
  const { profile } = useAuth();
  const [data, setData] = React.useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = React.useState({});

  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    const error = validateData(data);

    setErrors(error);
    if (Object.keys(error).length > 0) return;

    setLoading(true);

    try {
      const credential = EmailAuthProvider.credential(
        profile.email,
        data.password
      );

      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, data.newPassword)
        .then(() => {
          setLoading(false);
          Alert.alert("Success", "Password updated successfully");
          setData({ password: "", newPassword: "", confirmPassword: "" });
        })
        .catch((error) => {
          throw new Error("Error updating password");
        });
    } catch (error) {
      setLoading(false);
      const errorCode = error.code;
      Alert.alert("Error", DecodeError(errorCode));
    }
  };

  return (
    <Container>
      <Header title="Update Password" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 10 }}>
          <TextInput
            label="Current Password"
            value={data.password}
            autoCapitalize={"none"}
            onChangeText={(text) => setData({ ...data, password: text })}
            error={errors.password}
            type={"password"}
          />

          <TextInput
            label="New Password"
            value={data.newPassword}
            autoCapitalize={"none"}
            onChangeText={(text) => setData({ ...data, newPassword: text })}
            error={errors.newPassword}
            type={"password"}
          />

          <TextInput
            label="Confirm Password"
            value={data.confirmPassword}
            autoCapitalize={"none"}
            onChangeText={(text) => setData({ ...data, confirmPassword: text })}
            error={errors.confirmPassword}
            type={"password"}
          />

          <Button
            mode="contained"
            style={{
              height: 54.3,
              borderRadius: 10,
              marginTop: 20,
              justifyContent: "center",
            }}
            textColor="#fff"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
          >
            Update Password
          </Button>
        </View>
      </ScrollView>
    </Container>
  );
}

const validateData = (data) => {
  const errors = {};

  if (!data.password) errors.password = "Password is required";
  if (!data.newPassword) errors.newPassword = "New Password is required";
  if (!data.confirmPassword)
    errors.confirmPassword = "Confirm Password is required";
  if (data.newPassword !== data.confirmPassword)
    errors.confirmPassword = "Password does not match";

  return errors;
};

const styles = StyleSheet.create({
  coverCamera: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 5,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -15 }, { translateY: -15 }],
    zIndex: 3,
  },
});
