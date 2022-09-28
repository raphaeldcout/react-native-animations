import React, { useContext } from "react";

import Context from "../Context";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import Pictures from "./Picture";

import { SafeAreaView, StyleSheet, Dimensions, Text } from "react-native";

import SvgMenuHamburger from "./assets/svg-menu-hamburger.svg";
import SvgSearch from "./assets/svg-search.svg";
import AnimatedSvgLogoComponent from "./assets/svgLogoComponent";

const { width, height } = Dimensions.get("window");

const NikeStore = () => {
  const { setBackgroundColorApp } = useContext(Context);
  const finishedIntroAnimation = useSharedValue(false);

  React.useEffect(() => {
    setBackgroundColorApp("#141216");

    return () => {
      setBackgroundColorApp("#FFFFFF");
    };
  }, []);

  const finishedAnimationOpacity = useAnimatedStyle(() => {
    const opacity = finishedIntroAnimation.value ? withTiming(1) : 0;

    return {
      opacity,
    };
  });

  const animatedEnteringText = useAnimatedStyle(() => {
    const top = finishedIntroAnimation.value
      ? withDelay(100, withSpring(0, { damping: 20 }))
      : height / 2;

    return {
      top,
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.header, finishedAnimationOpacity]}>
        <SvgMenuHamburger width={22} height={22} fill="#FFFFFF" />
        <SvgSearch width={22} height={22} fill="#FFFFFF" />
      </Animated.View>

      <AnimatedSvgLogoComponent
        width={90}
        height={90}
        finishedIntroAnimation={finishedIntroAnimation}
      />

      <Animated.View style={[styles.contentTitle, finishedAnimationOpacity]}>
        <Animated.Text style={[styles.title, animatedEnteringText]}>
          Just In
        </Animated.Text>
      </Animated.View>
      <Animated.View style={[styles.contentCarrosel, finishedAnimationOpacity]}>
        <Pictures finishedIntroAnimation={finishedIntroAnimation} />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141216",
  },
  header: {
    width: width,
    height: 70,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  contentTitle: {
    width: width,
    paddingHorizontal: 15,
    marginTop: 5,
  },
  title: {
    fontFamily: "Work-Sans",
    fontSize: 30,
    color: "#dcdcdc",
  },
  contentCarrosel: {
    width: width,
    height: 280,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
});

export { NikeStore };
