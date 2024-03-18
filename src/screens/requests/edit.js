import { Button } from "react-native-paper";

import { Alert, ScrollView, StyleSheet, View, Keyboard } from "react-native";
import React from "react";

import { colors } from "../../constants";
import { TextInput } from "../../components/form";
import { useFirebase } from "../../hooks";

export default function EditUserScreen({ route, navigation }) {
  const { user } = route.params;
  const { updateDocument } = useFirebase();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    ...user,
  });
  const [errors, setErrors] = React.useState({});
  const scrollRef = React.useRef();

  React.useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        scrollRef.current.scrollTo({ y: 0, animated: true });
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const setValue = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    const errors = validate(data);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const res = await updateDocument(
      "users",
      user.id,
      {
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
        address: data.address,
      },
      setLoading
    );

    if (res.error) return;

    Alert.alert("Success", "User updated successfully", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const updateUser = async (user, status) => {
    const res = await updateDocument("users", user.id, {
      status,
    });

    if (res.error) return;

    Alert.alert("Success", "User updated successfully", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <React.Fragment>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#fff",
          padding: 10,
        }}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: "49%" }}>
            <TextInput
              label="First Name"
              placeholder="First Name"
              value={data.firstname}
              onChangeText={(val) => {
                setValue("firstname", val);
                required("firstname", val, setErrors, "First Name");
              }}
              error={errors.firstname}
            />
          </View>
          <View style={{ width: "49%" }}>
            <TextInput
              label="Last Name"
              placeholder="Last Name"
              value={data.lastname}
              onChangeText={(val) => {
                setValue("lastname", val);
                required("lastname", val, setErrors, "Last Name");
              }}
              error={errors.lastname}
            />
          </View>
        </View>

        <TextInput
          label="Email Address"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={data.email}
          error={errors.email}
          disabled={true}
        />

        <TextInput
          label="Phone Number"
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={data.phone}
          onChangeText={(val) => {
            setValue("phone", val);
            required("phone", val, setErrors, "Phone Number", 10);
          }}
          error={errors.phone}
        />

        <TextInput
          label="Address"
          placeholder="Address"
          value={data.address}
          onChangeText={(val) => {
            setValue("address", val);
            required("address", val, setErrors, "Address");
          }}
          error={errors.address}
        />

        <Button
          mode="contained"
          style={{
            paddingVertical: 5,
            marginTop: 10,
          }}
          onPress={() => {
            handleSave();
          }}
          loading={loading}
          disabled={loading}
        >
          Save
        </Button>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          {["pending", "active"].includes(user.status) && (
            <Button
              mode="contained"
              style={[
                styles.button,
                user.status == "pending" ? { width: "48%" } : { width: "100%" },
              ]}
              onPress={
                () =>
                  Alert.alert(
                    "Confirm",
                    "Are you sure you want to block this user?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => null,
                        style: "cancel",
                      },
                      {
                        text: "OK",
                        onPress: () => updateUser(user, "blocked"),
                      },
                    ]
                  )
                // updateUser(user, 'blocked')
              }
              textColor="white"
              buttonColor="red"
              loading={loading}
              disabled={loading}
            >
              Block
            </Button>
          )}

          {user.status === "pending" && (
            <Button
              mode="contained"
              style={[styles.button, { width: "48%" }]}
              buttonColor="#28a745"
              textColor="white"
              onPress={() =>
                Alert.alert(
                  "Confirm",
                  "Are you sure you want to approve this user?",
                  [
                    {
                      text: "Cancel",
                      onPress: () => null,
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => updateUser(user, "active"),
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

        {["blocked"].includes(user.status) && (
          <Button
            mode="contained"
            style={[styles.button]}
            onPress={
              () =>
                Alert.alert(
                  "Confirm",
                  "Are you sure you want to unblock this user?",
                  [
                    {
                      text: "Cancel",
                      onPress: () => null,
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => updateUser(user, "active"),
                    },
                  ]
                )
              // updateUser(user, 'active')
            }
            buttonColor="#28a745"
            textColor="white"
            loading={loading}
            disabled={loading}
          >
            Unblock
          </Button>
        )}

        <View style={{ height: 350 }} />
      </ScrollView>
    </React.Fragment>
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

  if (!data.firstname) errors.firstname = "First Name is required";
  if (!data.lastname) errors.lastname = "Last Name is required";

  if (!data.phone) errors.phone = "Phone Number is required";
  else if (data.phone.length < 10)
    errors.phone = "Phone Number must be at least 10 characters";

  if (!data.address) errors.address = "Address is required";

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
