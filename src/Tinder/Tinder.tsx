import React from "react";
import {
  HandlerStateChangeEvent,
  State,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { getStatusBarHeight } from "react-native-status-bar-height";

import { assets } from "./pictures";

import Picture from "./Picture";

import { View, StyleSheet, Dimensions, Image, Platform } from "react-native";

import SvgGoBack from "../Tinder/assets/svg-go-back.svg";
import AnimatedSvgComponent from "./assets/svgComponent";
import SvgLightning from "../Tinder/assets/svg-lightning.svg";

const { width, height } = Dimensions.get("window");

const CARD_WIDTH = width - width * 0.05;
const CARD_HEIGHT = height * 0.75;

const Tinder = () => {
  const startingPosition = CARD_WIDTH / 2 - CARD_WIDTH / 2;
  const svgX = useSharedValue(startingPosition);
  const svgY = useSharedValue(startingPosition);
  const tapTransitionX = useSharedValue(startingPosition);
  const tapTransitionXImg = useSharedValue(0);

  const tXY = useDerivedValue(() => {
    return (svgY.value / CARD_HEIGHT) * svgX.value;
  }, [svgY]);

  const nopeOpacityAction = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      svgX.value,
      [-110, -40, -2, -1],
      ["transparent", "#db4a39", "#db4a39", "transparent"]
    );

    const scale = interpolate(svgX.value, [0, -150, -1, 0], [1, 1, 0.8, 1], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    return {
      backgroundColor,
      transform: [{ scale }],
    };
  });

  const superLikeOpacityAction = useAnimatedStyle(() => {
    const translateY = interpolate(tXY.value, [-50, 0, 50], [2, 0, 2], {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.CLAMP,
    });

    const translate = translateY > 1 ? 0 : svgY.value;

    const backgroundColor = interpolateColor(
      translate,
      [-230, -160, -2, -1],
      ["transparent", "#589cf6", "#589cf6", "transparent"]
    );

    const scale = interpolate(translate, [0, -400, -1, 0], [1, 1, 0.8, 1], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    return {
      backgroundColor,
      transform: [{ scale }],
    };
  });

  const likeOpacityAction = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      -svgX.value,
      [-110, -40, -2, -1],
      ["transparent", "#9df0a6", "#9df0a6", "transparent"]
    );

    const scale = interpolate(-svgX.value, [0, -150, -1, 0], [1, 1, 0.8, 1], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    return {
      backgroundColor,
      transform: [{ scale }],
    };
  });

  const onSingleTapEvent = (
    event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>,
    imgsLength: number
  ) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      const tapPositionX = event.nativeEvent.x / CARD_WIDTH;

      if (tapPositionX <= 0.5) {
        tapTransitionXImg.value === 0 ? 0 : tapTransitionXImg.value--;
        tapTransitionX.value = tapTransitionXImg.value === 0 ? -2 : 0;
      } else {
        tapTransitionXImg.value >= imgsLength
          ? imgsLength
          : tapTransitionXImg.value++;
        tapTransitionX.value = tapTransitionXImg.value === imgsLength ? 2 : 0;
      }
    } else {
      tapTransitionX.value = withTiming(0, { duration: 300 });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.contentUserProfile}>
          <Image
            style={styles.userProfile}
            source={require("../Tinder/assets/user-profile.png")}
          />
        </View>
        <Image
          style={styles.logo}
          source={require("../Tinder/assets/logo.png")}
        />
      </View>

      {assets.map((picture, index) => (
        <Picture
          key={index}
          picture={picture}
          index={index}
          svgX={svgX}
          svgY={svgY}
          onSingleTapEvent={onSingleTapEvent}
          tapTransitionX={tapTransitionX}
          tapTransitionXImg={tapTransitionXImg}
        />
      ))}

      <Animated.View style={[styles.bottomActions]} pointerEvents="none">
        <View style={[styles.action, { borderColor: "#efc45e" }]}>
          <SvgGoBack width={30} height={30} fill="#F2D575" />
        </View>

        <View
          style={[
            styles.action,
            {
              borderWidth: 0,
              transform: [{ scale: 1.2 }],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.action,
              {
                ...StyleSheet.absoluteFillObject,
                borderColor: "#be443f",
                borderWidth: 1,
                transform: [{ scale: 1 }],
                backgroundColor: "transparent",
              },
              nopeOpacityAction,
            ]}
          />
          <AnimatedSvgComponent
            type="close"
            svgX={svgX}
            svgY={svgY}
            width={30}
            height={28}
            cardWidth={-CARD_WIDTH}
            colorFrom="#ffffff"
            colorTo="#EA5F69"
          />
        </View>

        <View
          style={[
            styles.action,
            {
              borderWidth: 0,
              transform: [{ scale: 1 }],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.action,
              {
                ...StyleSheet.absoluteFillObject,
                borderColor: "#497dc3",
                borderWidth: 1,
                transform: [{ scale: 1 }],
                backgroundColor: "transparent",
              },
              superLikeOpacityAction,
            ]}
          />
          <AnimatedSvgComponent
            type="star"
            svgX={svgX}
            svgY={svgY}
            width={31}
            height={37}
            cardWidth={-CARD_HEIGHT}
            colorFrom="#ffffff"
            colorTo="#68CAF1"
          />
        </View>

        <View
          style={[
            styles.action,
            {
              borderWidth: 0,
              transform: [{ scale: 1.2 }],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.action,
              {
                ...StyleSheet.absoluteFillObject,
                borderColor: "#7cbe83",
                borderWidth: 1,
                transform: [{ scale: 1 }],
                backgroundColor: "transparent",
              },
              likeOpacityAction,
            ]}
          />
          <AnimatedSvgComponent
            type="heart"
            svgX={svgX}
            svgY={svgY}
            width={30}
            height={32}
            cardWidth={CARD_WIDTH}
            colorFrom="#ffffff"
            colorTo="#6DE5B5"
          />
        </View>

        <View style={[styles.action, { borderColor: "#b07ad7" }]}>
          <SvgLightning width={30} height={30} fill="#A74FE9" />
        </View>
      </Animated.View>

      <View style={styles.footer}>
        <Image
          style={styles.icon}
          source={require("../Tinder/assets/icon-tinder.png")}
        />

        <Image
          style={styles.icon}
          source={require("../Tinder/assets/icon-stars.png")}
        />

        <Image
          style={styles.icon}
          source={require("../Tinder/assets/icon-search.png")}
        />

        <Image
          style={styles.icon}
          source={require("../Tinder/assets/icon-message.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width,
    height: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    marginTop: Platform.OS == "android" ? getStatusBarHeight() - 10 : 0,
  },
  contentUserProfile: {
    position: "absolute",
    left: 15,
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
  },
  userProfile: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
  },
  logo: {
    width: 90,
    height: 50,
    borderRadius: 25,
  },
  bottomActions: {
    position: "absolute",
    width: CARD_WIDTH,
    bottom: 60 + 20,
    left: (width * 0.05) / 2,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    zIndex: 2,
  },
  action: {
    width: 50,
    height: 50,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width,
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    zIndex: 2,
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export { Tinder, assets };
