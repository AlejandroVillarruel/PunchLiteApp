import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as React from "react";

import { screens } from "../screens";
import { colors } from "../../constants";

import EditProfileScreen from "../../screens/profile/edit";
import HomeScreen from "../../screens/home";
import CheckoutScreen from "../../screens/home/checkout";
import UpdatePasswordScreen from "../../screens/profile/password";
import RequestAbsenseScreen from "../../screens/absense/request";
import WeeklyReportScreen from "../../screens/home/report";

const Stack = createNativeStackNavigator();

export default function ClientStack() {
  const screenOptions = {
    headerShown: true,
    headerTitleAlign: "center",
    headerTintColor: colors.primary,
    headerBackTitleVisible: false,
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={screens.home} component={HomeScreen} />
      <Stack.Screen name={screens.editProfile} component={EditProfileScreen} />
      <Stack.Screen
        name={screens.weeklyReport}
        component={WeeklyReportScreen}
      />
      <Stack.Screen
        name={screens.requestAbsense}
        component={RequestAbsenseScreen}
      />
      <Stack.Screen
        name={screens.updatePassword}
        component={UpdatePasswordScreen}
      />
      <Stack.Screen
        name={screens.checkout}
        component={CheckoutScreen}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}
