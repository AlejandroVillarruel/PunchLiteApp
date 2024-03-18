import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as React from "react";

import { colors } from "../../constants/colors";
import EditUserScreen from "../../screens/user/edit";

import AdminStack from "./bottom";
import { screens } from "../screens";
import WeeklyReportScreen from "../../screens/absense/report";

const Stack = createNativeStackNavigator();

export default function AdminStackNav() {
  const options = {
    headerShown: true,
    headerStyle: {
      backgroundColor: colors.secondary,
    },
    headerTintColor: "#fff",
    headerBackTitleVisible: false,
  };

  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={screens.adminStack} component={AdminStack} />

      <Stack.Screen
        name={screens.editUser}
        component={EditUserScreen}
        options={{
          ...options,
          headerTitle: "Edit User",
        }}
      />
      <Stack.Screen
        name={screens.weeklyReport}
        component={WeeklyReportScreen}
        options={{
          ...options,
          headerTitle: "Weekly Report",
        }}
      />
    </Stack.Navigator>
  );
}
