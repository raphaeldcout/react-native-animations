import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import Routes from "./src/routes";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.gestureHandlerRootView}>
        <Routes />
      </GestureHandlerRootView>
      <StatusBar style="dark" backgroundColor="#ffffff" />
    </SafeAreaView>
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
