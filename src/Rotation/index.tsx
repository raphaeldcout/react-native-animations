import React from "react";

import { Button, StyleSheet, View, Dimensions } from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const Rotation = () => {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} />
      <Button
        title="wobble"
        onPress={() => {
          rotation.value = withSequence(
            withTiming(-10, { duration: 50 }),
            withRepeat(withTiming(15, { duration: 100 }), 6, true),
            withTiming(0, { duration: 50 })
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: "center",
    justifyContent: "space-around",
  },
  box: {
    width: 100,
    height: 100,
    borderRadius: 25,
    backgroundColor: "#5c4fb0",
  },
});

export default Rotation;
