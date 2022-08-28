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
      transform: [{ translateX: x.value }, { translateY: y.value }],
    };
  });

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressed.value = true;
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: (event, ctx) => {
      pressed.value = false;
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
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
