import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AlertBox } from "react-native-alertbox";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import * as React from "react";

import AppNavigation from "./src/routes/app";
import { AuthProvider } from "./src/contexts/authContext";

export default function App() {
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: "#29B6F6",
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <ActionSheetProvider>
          <NavigationContainer>
            <AuthProvider>
              <AppNavigation />
              <AlertBox />
            </AuthProvider>
          </NavigationContainer>
        </ActionSheetProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
