import React from "react";

import { StyleSheet, View, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const CONTENT_BALL = 100;

const Swipe = () => {
  const pressed = useSharedValue(false);
  const startingPosition = width / 2 - CONTENT_BALL / 2;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(-startingPosition);

  const uas = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? "#FEEF86" : "#aad3cb",
      transform: [
        { translateX: x.value },
        { translateY: y.value },
        { scale: withSpring(pressed.value ? 1.3 : 1) },
      ],
    };
  });

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressed.value = true;
    },
    onActive: (event, ctx) => {
      x.value = startingPosition + event.translationX;
      y.value = -startingPosition + event.translationY;
    },
    onEnd: (event, ctx) => {
      pressed.value = false;
      x.value = withSpring(startingPosition);
      y.value = withSpring(-startingPosition);
    },
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View collapsable={false} style={[styles.ball, uas]} />
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height,
    justifyContent: "space-around",
  },
  ball: {
    width: CONTENT_BALL,
    height: CONTENT_BALL,
    borderRadius: 50,
  },
});

export default Swipe;
