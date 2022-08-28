import React, { FC } from "react";

import { View, Text, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

import Animated, { FadeInDown } from "react-native-reanimated";

import { IListItemProps, EnumRoutes } from "./types.data";

const ListItem: FC<IListItemProps> = ({ title, routeName }) => {
  const navigation = useNavigation<EnumRoutes>();
  return (
    <Animated.View entering={FadeInDown} style={styles.container}>
      <RectButton
        style={styles.rectButton}
        onPress={() => {
          navigation.navigate(routeName);
        }}
      >
        <Text style={styles.text}>{title}</Text>
      </RectButton>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#373737",
  },
  rectButton: {
    width: "100%",
    height: 50,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    color: "#fff",
  },
});

export default ListItem;
