import React from "react";

import { View, StyleSheet, Image, Dimensions, Text } from "react-native";

import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

import { LinearGradient } from "expo-linear-gradient";
import SvgLocation from "../Tinder/assets/svg-location.svg";

const { width, height } = Dimensions.get("window");

const CARD_WIDTH = width - width * 0.05;
const CARD_HEIGHT = height * 0.75;
const IMAGE_WIDTH = CARD_WIDTH;
const IMAGE_HEIGHT = CARD_HEIGHT;
const SNAP_POINTS_WIDTH = [-width, 0, width];
const SNAP_POINTS_HEIGHT = [-height, 0, height];

import { IPicturesProps } from "../Tinder/pictures";

const Picture = ({
  picture,
  index,
  svgX,
  svgY,
  onSingleTapEvent,
  tapTransitionX,
  tapTransitionXImg,
}: IPicturesProps) => {
  const startingPosition = CARD_WIDTH / 2 - CARD_WIDTH / 2;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);
  const rotateZ = useSharedValue(0);
  const scale = useSharedValue(1);

  const panEventHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { rotate: number }
  >({
    onStart: (event, ctx) => {
      ctx.rotate = event.y / CARD_HEIGHT > 0.5 ? -0.08 : 0.08;
    },
    onActive: (event, ctx) => {
      x.value = startingPosition + event.translationX;
      svgX.value = startingPosition + event.translationX;

      y.value = startingPosition + event.translationY;
      svgY.value = startingPosition + event.translationY;

      rotateZ.value = event.translationX * ctx.rotate;
      scale.value = withTiming(1.05);
    },
    onEnd: (event, ctx) => {
      const destX = snapPoint(x.value, event.velocityX, SNAP_POINTS_WIDTH);
      x.value = withSpring(destX, { stiffness: 200, damping: 15 });
      svgX.value = startingPosition;

      const destY = snapPoint(y.value, event.velocityY, SNAP_POINTS_HEIGHT);
      y.value = withSpring(destY < 0 ? destY : startingPosition, {
        stiffness: 200,
        damping: 15,
      });
      svgY.value = startingPosition;

      rotateZ.value = withTiming(0);
      scale.value = withTiming(1);
    },
  });

  const styleCard = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value || tapTransitionX.value },
        { translateY: y.value },
        { rotateZ: `${rotateZ.value}deg` },
        { scale: scale.value },
        { perspective: tapTransitionX.value ? 350 : 1000 },
        { rotateY: `${tapTransitionX.value * 2}deg` },
      ],
    };
  });

  const likeOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(x.value, [0, CARD_WIDTH / 5], [0, 1]);

    return {
      opacity,
    };
  });

  const nopeOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(x.value, [-CARD_WIDTH / 5, 0], [1, 0]);

    return {
      opacity,
    };
  });

  const superLikeOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(y.value, [0, -CARD_HEIGHT / 1.5], [0, 1]);

    return {
      opacity,
    };
  });

  return (
    <Animated.View
      style={styles.container}
      pointerEvents="box-none"
      key={index}
    >
      <PanGestureHandler onGestureEvent={panEventHandler}>
        <Animated.View style={[styles.card, styleCard]}>
          <TapGestureHandler
            onHandlerStateChange={(event) => {
              onSingleTapEvent(event, picture.source.length - 1);
            }}
          >
            <Animated.View style={styles.content}>
              {picture.source.map((source, i) => {
                const translateX = useSharedValue(IMAGE_WIDTH * i);

                const style = useAnimatedStyle(() => {
                  let minus = 0;
                  if (tapTransitionXImg.value === i) {
                    minus = IMAGE_WIDTH * i;
                  }

                  return {
                    transform: [{ translateX: translateX.value - minus }],
                  };
                });

                return (
                  <Animated.Image
                    key={i}
                    source={source}
                    style={[
                      {
                        width: IMAGE_WIDTH,
                        height: IMAGE_HEIGHT,
                        ...StyleSheet.absoluteFillObject,
                      },
                      style,
                    ]}
                    resizeMode="cover"
                  />
                );
              })}

              <View style={styles.overlay}>
                <View style={styles.pointsStorys}>
                  {picture.source.map((_, i) => {
                    const style = useAnimatedStyle(() => {
                      return {
                        backgroundColor:
                          i === tapTransitionXImg.value ? "#fefefe" : "#000000",
                        opacity: i === tapTransitionXImg.value ? 1 : 0.4,
                      };
                    });

                    return (
                      <Animated.View
                        key={i}
                        style={[
                          styles.story,
                          {
                            width: CARD_WIDTH / (picture.source.length * 1.05),
                          },
                          style,
                        ]}
                      />
                    );
                  })}
                </View>

                <View style={styles.likeNope}>
                  <Animated.View style={[styles.like, likeOpacity]}>
                    <Text style={styles.likeLabel}>LIKE</Text>
                  </Animated.View>
                  <Animated.View style={[styles.nope, nopeOpacity]}>
                    <Text style={styles.nopeLabel}>NOPE</Text>
                  </Animated.View>
                </View>

                <View style={styles.superLike}>
                  <Animated.View
                    style={[styles.superLikeContent, superLikeOpacity]}
                  >
                    <Text style={styles.superLikeLabel}>SUPER LIKE</Text>
                  </Animated.View>
                </View>

                <LinearGradient
                  colors={[
                    "transparent",
                    "rgba(0,0,0,1)",
                    "rgba(0,0,0,1)",
                    "rgba(0,0,0,1)",
                  ]}
                  style={styles.personalInfos}
                >
                  <View
                    style={[
                      styles.personalInfosContainer,
                      {
                        marginTop: picture.active
                          ? (CARD_HEIGHT * 0.45) / 2
                          : (CARD_HEIGHT * 0.5) / 2,
                      },
                    ]}
                  >
                    <View style={styles.personalContentInfo}>
                      <Text style={styles.name}>
                        {picture.name}{" "}
                        <Text style={styles.age}>{picture.age}</Text>
                      </Text>
                    </View>
                    {picture.active ? (
                      <View style={styles.personalContentInfo}>
                        <View style={styles.ballRecentlyActive} />
                        <Text style={styles.textDefault}>Recently Active</Text>
                      </View>
                    ) : null}
                    <View style={styles.personalContentInfo}>
                      <SvgLocation
                        width={13}
                        height={13}
                        style={{ marginRight: 2 }}
                      />
                      <Text style={styles.textDefault}>{picture.distance}</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </Animated.View>
          </TapGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  content: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pointsStorys: {
    flex: 1,
    width: CARD_WIDTH - 10,
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  story: {
    height: 3,
    borderRadius: 5,
    marginTop: 5,
    marginRight: 3,
  },
  likeNope: {
    position: "absolute",
    top: 18,
    width: CARD_WIDTH - 30,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 1,
    marginTop: 10,
  },
  like: {
    borderWidth: 4,
    borderRadius: 5,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: "#67c77f",
    transform: [{ rotate: "-15deg" }],
  },
  likeLabel: {
    fontSize: 38,
    color: "#67c77f",
    fontWeight: "bold",
  },
  nope: {
    borderWidth: 4,
    borderRadius: 5,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: "#ea5d6b",
    transform: [{ rotate: "15deg" }],
  },
  nopeLabel: {
    fontSize: 38,
    color: "#ea5d6b",
    fontWeight: "bold",
  },
  superLike: {
    position: "absolute",
    bottom: CARD_HEIGHT * 0.11,
    width: CARD_WIDTH - 30,
    flexDirection: "row",
    justifyContent: "center",
    zIndex: 2,
    marginBottom: 10,
  },
  superLikeContent: {
    width: CARD_WIDTH / 2,
    borderWidth: 4,
    borderRadius: 5,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: "#497dc3",
    transform: [{ rotate: "-15deg" }],
  },
  superLikeLabel: {
    fontSize: 38,
    color: "#497dc3",
    fontWeight: "bold",
    textAlign: "center",
  },
  personalInfos: {
    flex: 1,
    width: CARD_WIDTH,
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: 1,
    borderRadius: 10,
  },
  personalInfosContainer: {
    width: CARD_WIDTH - 15,
    height: CARD_HEIGHT * 0.25,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  ballRecentlyActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#96df63",
    marginRight: 5,
  },
  personalContentInfo: {
    width: CARD_WIDTH - 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 2,
  },
  name: {
    fontSize: 34,
    color: "#ffffff",
    fontWeight: "bold",
  },
  age: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "normal",
  },
  textDefault: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "normal",
  },
});

export default Picture;
