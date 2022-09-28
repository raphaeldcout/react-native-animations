import React, { Fragment } from "react";

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

import { View, StyleSheet, Dimensions, Text, FlatList } from "react-native";

import { carrosels, assets, IItemAttributesProps } from "./pictures";

import { IPicturesProps } from "./pictures";

const { width, height } = Dimensions.get("window");

const IMAGE_WIDTH = width * 0.9;
const IMAGE_HEIGHT = height * 0.2;
const SNAP_POINTS_WIDTH = [-width, 0, width];

const Picture = ({ finishedIntroAnimation }: IPicturesProps) => {
  const aref = useAnimatedRef();
  const translateX = useSharedValue(IMAGE_WIDTH);
  const x = useSharedValue(IMAGE_WIDTH);

  const styleItem = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }],
    };
  });

  const styleText = useAnimatedStyle(() => {
    let minus = 0;

    return {
      transform: [{ translateX: translateX.value - minus }],
    };
  });

  const styleImage = useAnimatedStyle(() => {
    let minus = 0;

    return {
      transform: [
        { translateX: translateX.value - minus },
        { rotate: "-20deg" },
      ],
    };
  });

  const animatedEnteringView = useAnimatedStyle(() => {
    const top = finishedIntroAnimation.value
      ? withDelay(200, withSpring(0, { damping: 20 }))
      : height / 2;

    return {
      top,
    };
  });

  return (
    <Animated.View style={[styles.carrosel, animatedEnteringView]}>
      <FlatList
        //ref={aref}
        data={carrosels}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item, i) => item.name + i}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </Animated.View>
  );
};

const RenderItem = ({ item }: IItemAttributesProps) => {
  return (
    <Animated.View style={[styles.item]}>
      <Animated.Text
        style={[styles.title, { color: item.textColor, zIndex: 1 }]}
      >
        {item.name}
      </Animated.Text>
      <Animated.Image
        source={item.source}
        style={[
          {
            width: IMAGE_WIDTH,
            height: IMAGE_HEIGHT,
            transform: [{ rotate: "-20deg" }],
          },
        ]}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  carrosel: {
    width: width * 0.9,
    backgroundColor: "#FFFFFF",
    height: 280,
    borderRadius: 25,
  },
  item: {
    width: width * 0.9,
    height: 280,
    borderRadius: 25,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-around",
    //...StyleSheet.absoluteFillObject,
  },
  title: {
    fontFamily: "Work-Sans",
    paddingHorizontal: 15,
    fontSize: 25,
  },
});

export default Picture;
