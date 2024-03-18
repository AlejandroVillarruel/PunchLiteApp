import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

import { colors } from "../../constants/colors";
import UserManagementStack from "../../screens/user";
import { screens } from "../screens";
import { useAuth } from "../../hooks";
import AbsenseManagementStack from "../../screens/requests";

const Tab = createBottomTabNavigator();

export default function AdminStack() {
  const { logout } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.secondary,
        },
        headerRight: () => (
          <TouchableOpacity onPress={() => logout()}>
            <SimpleLineIcons
              name="logout"
              size={24}
              color="#fff"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen
        name={screens.usermanagement}
        component={UserManagementStack}
        options={({ navigation }) => ({
          headerTitle: "Employees",
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <FontAwesome
                name={focused ? "user" : "user-o"}
                size={24}
                color={colors.white}
              />
              <Text style={{ color: colors.white, fontSize: 12 }}>
                Employees
              </Text>
            </View>
          ),
        })}
      />
      <Tab.Screen
        name={screens.absenseManagement}
        component={AbsenseManagementStack}
        options={({ navigation }) => ({
          headerTitle: "Absense",
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <FontAwesome
                name={focused ? "file" : "file-o"}
                size={24}
                color={colors.white}
              />
              <Text style={{ color: colors.white, fontSize: 12 }}>Absense</Text>
            </View>
          ),
        })}
      />
    </Tab.Navigator>
  );
}
