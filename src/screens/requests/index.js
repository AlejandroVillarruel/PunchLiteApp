import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ActiveUsers from "./active";
import BlockedUsers from "./blocked";
import PendingUsers from "./pending";
import { screens } from "../../routes/screens";

const Tab = createMaterialTopTabNavigator();

export default function AbsenseManagementStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={screens.newRequests}
        component={PendingUsers}
        options={{
          tabBarLabel: "New",
        }}
      />
      <Tab.Screen
        name={screens.activeRequests}
        component={ActiveUsers}
        options={{
          tabBarLabel: "Approved",
        }}
      />
      <Tab.Screen
        name={screens.blockedRequests}
        component={BlockedUsers}
        options={{
          tabBarLabel: "Rejected",
        }}
      />
    </Tab.Navigator>
  );
}
