import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ActiveUsers from "./active";
import BlockedUsers from "./blocked";
import PendingUsers from "./pending";

const Tab = createMaterialTopTabNavigator();

export default function UserManagementStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="PendingUsers"
        component={PendingUsers}
        options={{
          tabBarLabel: "New",
        }}
      />
      <Tab.Screen
        name="ActiveUsers"
        component={ActiveUsers}
        options={{
          tabBarLabel: "Active",
        }}
      />
      <Tab.Screen
        name="InactiveUsers"
        component={BlockedUsers}
        options={{
          tabBarLabel: "Blocked",
        }}
      />
    </Tab.Navigator>
  );
}
