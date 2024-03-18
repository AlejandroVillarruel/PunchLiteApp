import { Button } from "react-native-paper";

import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { colors } from "../../constants";
import { screens } from "../../routes/screens";
import { TextInput } from "../../components/form";
import { useAuth } from "../../hooks";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import DecodeError from "../../utils/decodeError";

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = React.useState({});

  const handleLogin = async () => {
    const errors = validate(data);

    setErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        login(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        Alert.alert("Error", DecodeError(errorCode));
      })
      .finally(() => setLoading(false));
  };

  const setValue = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: colors.primary,
          textAlign: "center",
        }}
      >
        Login
      </Text>
      <Text
        style={{ color: colors.grey, textAlign: "center", marginBottom: 20 }}
      >
        Please sign-up to your account
      </Text>

      <TextInput
        label="Email"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={data.email}
        onChangeText={(val) => {
          setValue("email", val);
          email("email", val, setErrors);
        }}
        error={errors.email}
      />
      <TextInput
        label="Password"
        placeholder="Password"
        value={data.password}
        onChangeText={(val) => {
          setValue("password", val);
          required("password", val, setErrors, "Password");
        }}
        type="password"
        error={errors.password}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <View />
        <TouchableOpacity
          style={{
            alignSelf: "center",
          }}
          onPress={() => navigation.navigate(screens.forgetPass)}
        >
          <Text style={{ color: colors.primary }}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <Button
        mode="contained"
        onPress={handleLogin}
        style={{
          paddingVertical: 5,
        }}
        loading={loading}
        disabled={loading}
      >
        Sign In
      </Button>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate(screens.signup)}>
          <Text style={{ color: colors.primary }}>Sign Up Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  toolTip: {
    backgroundColor: colors.primaryLight,
    padding: 5,
    marginLeft: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  toolTipText: {
    color: colors.primary,
    fontSize: 12,
  },
});

const validate = (data) => {
  const errors = {};
  if (!data.email) errors.email = "Email is required";
  if (!data.password) errors.password = "Password is required";
  return errors;
};

const required = (key, value, setErrors, label, min) => {
  if (!value) setErrors((prev) => ({ ...prev, [key]: label + " is Required" }));
  else if (min && value.length < min)
    setErrors((prev) => ({
      ...prev,
      [key]: label + " must be at least " + min + " characters",
    }));
  else setErrors((prev) => ({ ...prev, [key]: "" }));
};

const email = (key, value, setErrors) => {
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(value))
    setErrors((prev) => ({ ...prev, [key]: "Invalid Email" }));
  else setErrors((prev) => ({ ...prev, [key]: "" }));
};
