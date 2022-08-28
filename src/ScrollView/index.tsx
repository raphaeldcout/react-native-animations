import React from "react";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  FadeInRight,
  withTiming,
  Easing,
} from "react-native-reanimated";

import { View, StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");
const HEIGHT_BOX = Platform.OS == "android" ? 85 : 45;
const itens = Array(10).fill(0);

function ScrollExample() {
  const translationY = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translationY.value = event.contentOffset.y;
    },
    onBeginDrag: (event) => {
      //isScrolling.value = event.contentOffset.y > 0;
    },
    onEndDrag: (event) => {
      //isScrolling.value = event.contentOffset.y <= 0;
    },
  });

  const stylez = useAnimatedStyle(() => {
    return {
      height: withTiming(translationY.value > 0 ? 0 : HEIGHT_BOX, {
        duration: 400,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, stylez]} />
      <Animated.ScrollView
        style={styles.scroll}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <View style={styles.contentScrollView}>
          {itens.map((_, index) => (
            <ComponentContent key={index} index={index} />
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const ComponentContent = ({ index }) => {
  return (
    <Animated.View
      entering={FadeInRight.delay(index * 150)}
      style={styles.componentContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    width,
  },
  contentScrollView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width,
    backgroundColor: "#ffffff",
  },
  componentContainer: {
    width: width - 30,
    height: 100,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    margin: 10,
  },
});

export default ScrollExample;
