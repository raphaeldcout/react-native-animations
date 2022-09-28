import React from "react";

import { Dimensions } from "react-native";

import { SharedValue } from "react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper";

import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import Svg, { Path } from "react-native-svg";

const { width, height } = Dimensions.get("window");
const screenWidth = width;
const screenHeight = height;

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedPath = Animated.createAnimatedComponent(Path);

interface SvgProps {
  width: number;
  height: number;
  finishedIntroAnimation: SharedValue<boolean>;
}

const SvgLogoComponent: React.FC<SvgProps> = ({
  width,
  height,
  finishedIntroAnimation,
}) => {
  const START_POSITION_HEIGHT = useSharedValue(screenHeight / 2 - height);
  const START_POSITION_WIDTH = useSharedValue(screenWidth / 2 - width / 2);

  const styles = useAnimatedStyle(() => {
    var scale = 1;

    if (!finishedIntroAnimation.value) {
      scale = withDelay(
        600,
        withRepeat(
          withSequence(
            withTiming(0.8, {
              duration: 700,
            }),
            withTiming(1, {
              duration: 500,
            })
          ),
          3,
          true,
          (finished) => {
            finishedIntroAnimation.value = finished;
            START_POSITION_HEIGHT.value = withSpring(-10, { damping: 20 });
          }
        )
      );
    }

    return {
      top: START_POSITION_HEIGHT.value,
      transform: [{ scale: scale }],
    };
  });

  return (
    <AnimatedSvg
      width={width}
      height={height}
      viewBox="0 0 507 175"
      fill="none"
      style={[
        {
          position: "absolute",
          left: START_POSITION_WIDTH.value,
        },
        styles,
      ]}
    >
      <AnimatedPath
        d="M62.1053 10.75C26.9903 45.744 0.0913052 94.845 0.000305245 124.114C-0.0696948 146.958 11.9003 162.44 35.3963 169.893C54.5073 175.955 69.3213 176.256 90.7163 171.017C108.023 166.78 115.74 163.8 216.983 122.27C267.858 101.401 353.911 66.168 408.212 43.975C462.512 21.782 506.794 3.477 506.615 3.299C505.877 2.561 284.758 57.584 212.483 76.489C169.583 87.711 130.433 97.647 125.483 98.569C114.494 100.616 97.4133 100.849 89.9833 99.054C66.0033 93.258 52.2513 72.112 55.9613 46.737C57.9163 33.366 62.2933 20.904 69.8293 7.25C72.0303 3.262 73.6203 0 73.3613 0C73.1033 0 68.0383 4.838 62.1053 10.75Z"
        fill="white"
      />
    </AnimatedSvg>
  );
};

export default SvgLogoComponent;
