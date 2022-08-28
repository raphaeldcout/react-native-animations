import React from "react";

import { View, StyleSheet, Platform } from "react-native";

import ListItem from "./components/ListItem";

const Components = () => {
  return (
    <View style={styles.container}>
      <ListItem title="Rotation" routeName="Rotation" />
      <ListItem
        title="Swipe return origin position"
        routeName="SwipeReturnOriginPosition"
      />
      <ListItem
        title="Swipe keep current position"
        routeName="SwipeKeepCurrentPosition"
      />
      <ListItem title="Scroll view" routeName="ScrollView" />
      <ListItem title="Nike store shopping" routeName="TarotCards" />
      <ListItem title="Tinder swiping" routeName="Tinder" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#1e1e1e",
    marginTop: Platform.OS == "android" ? 92 : 0,
  },
});

export default Components;
