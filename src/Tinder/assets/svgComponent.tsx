import React from "react";
import { SharedValue } from "react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper";
import Animated, {
  interpolateColor,
  useAnimatedProps,
} from "react-native-reanimated";

import { Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");

const CARD_WIDTH = width - width * 0.05;

interface SvgProps {
  type: "close" | "star" | "heart";
  svgX?: SharedValue<number>;
  svgY?: SharedValue<number>;
  width: number;
  height: number;
  cardWidth: number;
  colorFrom: "RGB" | "HSV" | string;
  colorTo: "RGB" | "HSV" | string;
}

const SvgComponent: React.FC<SvgProps> = ({
  type,
  svgX,
  svgY,
  width,
  height,
  cardWidth,
  colorFrom,
  colorTo,
}) => {
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const [d, setD] = React.useState<string>("");
  const viewBox = `0 0 ${width * 2.25} ${height * 1.95}`;

  React.useEffect(() => {
    switch (type) {
      case "close":
        setD(
          "M14.6378 5.33117C12.6925 6.11713 11.7058 9.16888 12.7378 11.2073C12.9565 11.6393 16.6378 15.5137 20.9183 19.8166L28.7005 27.6402L20.7384 35.6437C16.359 40.0457 12.5968 44.0007 12.3781 44.4327C11.8285 45.5187 11.8806 46.9075 12.5177 48.1395C13.3206 49.6916 14.4295 50.3017 16.4493 50.3017H18.2399L26.5373 42.0317L34.8346 33.762L42.5618 41.5162C46.8118 45.7813 50.7261 49.5028 51.2603 49.7862C52.5228 50.4564 54.548 50.4431 55.8764 49.756C57.7022 48.8118 58.5443 46.2485 57.6249 44.4327C57.4062 44.0007 53.6023 40.0037 49.1718 35.5509L41.1165 27.4546L49.2099 19.3669C55.4645 13.117 57.3519 11.0203 57.5174 10.1387C58.0972 7.04877 55.1372 4.36932 52.0002 5.14448C51.3667 5.30096 48.115 8.26998 43.0014 13.3602L34.9943 21.3313L28.0736 14.48C18.8079 5.30743 18.4086 4.97326 16.7453 5.00132C16.004 5.01391 15.0558 5.16247 14.6378 5.33117Z"
        );
        break;
      case "star":
        setD(
          "M33.7967 8.4563C33.5416 8.77147 31.8219 12.0547 29.9746 15.7519C27.3725 20.9618 26.3925 22.524 25.6218 22.6935C25.0745 22.814 21.6779 23.3282 18.0738 23.8363C10.4988 24.9036 10.4078 24.9297 10.0295 26.121C9.79868 26.8485 10.8541 28.1316 15.5811 32.8684L21.4179 38.717L20.0839 46.3808C18.6988 54.3425 18.7447 55.5978 20.4216 55.5978C20.8833 55.5978 24.2778 54.0087 27.9648 52.0666C31.6515 50.1244 34.8358 48.5353 35.0411 48.5353C35.2459 48.5353 38.4055 50.1244 42.0625 52.0666C45.7196 54.0087 49.0955 55.5978 49.5647 55.5978C51.2566 55.5978 51.3039 54.3566 49.9161 46.3808L48.5821 38.717L54.4189 32.8684C59.1459 28.1316 60.2013 26.8485 59.9705 26.121C59.59 24.9226 59.4787 24.8917 51.6927 23.8147C47.9743 23.3 44.56 22.7336 44.1054 22.5558C43.6181 22.3655 41.8056 19.3405 39.6913 15.1895C36.9576 9.8229 35.8841 8.11509 35.1819 8.01489C34.6751 7.9425 34.0519 8.14114 33.7967 8.4563Z"
        );
        break;
      case "heart":
        setD(
          "M17.9258 8.38836C7.78733 10.9373 2.34907 22.409 6.28814 32.9371C7.50761 36.1974 9.54084 39.2658 12.8495 42.8415C15.7816 46.0095 31.7833 60.0833 33.4851 60.9911C34.091 61.314 35.0919 61.4513 35.7092 61.2966C37.0438 60.9614 53.3534 46.8854 57.0889 42.8443C65.0789 34.2008 67.0459 25.4388 62.8567 17.148C59.9218 11.3397 54.8549 8.19702 48.3674 8.16129C43.757 8.1359 40.3741 9.52744 37.1101 12.7919L34.9692 14.9323L32.8283 12.7919C28.9931 8.95672 22.8662 7.14585 17.9258 8.38836Z"
        );
        break;
    }
  }, [type]);

  const animatedProps = useAnimatedProps(() => {
    if (type === "star") {
      const translate = svgY.value;
      const inputRange = [
        cardWidth * 0.45,
        cardWidth * 0.3,
        cardWidth / CARD_WIDTH,
        0,
      ];

      const fill = interpolateColor(translate, inputRange, [
        colorTo,
        colorFrom,
        colorFrom,
        colorTo,
      ]);

      return {
        fill,
      };
    } else {
      const inputRange =
        cardWidth < 0
          ? [cardWidth * 0.18, cardWidth * 0.08, cardWidth / CARD_WIDTH, 0]
          : [0, cardWidth / CARD_WIDTH, cardWidth * 0.08, cardWidth * 0.18];

      const fill = interpolateColor(svgX.value, inputRange, [
        colorTo,
        colorFrom,
        colorFrom,
        colorTo,
      ]);

      return {
        fill,
      };
    }
  });

  return (
    <Svg width={width} height={height} viewBox={viewBox} fill="none">
      <AnimatedPath
        d={d}
        animatedProps={{ ...animatedProps }}
      />
    </Svg>
  );
};

export default SvgComponent;
