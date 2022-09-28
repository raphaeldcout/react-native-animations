import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";

import Context from "./src/Context";
import Routes from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Work-Sans": require("./assets/fonts/WorkSans.ttf"),
  });

  const [backgroundColorApp, setBackgroundColorApp] = React.useState("#FFFFFF");

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Context.Provider value={{ backgroundColorApp, setBackgroundColorApp }}>
      <SafeAreaView
        style={[styles.container, { backgroundColor: backgroundColorApp }]}
      >
        <GestureHandlerRootView style={styles.gestureHandlerRootView}>
          <Routes />
        </GestureHandlerRootView>
        <StatusBar
          style={backgroundColorApp === "#FFFFFF" ? "dark" : "light"}
          backgroundColor="#FFFFFF"
        />
      </SafeAreaView>
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gestureHandlerRootView: {
    flex: 1,
  },
});
