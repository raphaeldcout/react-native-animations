import { View, StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import Card from "./Card";

const cards = [
  {
    source: require("../../src/TarotCards/assets/chariot.png"),
  },
  {
    source: require("../../src/TarotCards/assets/death.png"),
  },
  {
    source: require("../../src/TarotCards/assets/devil.png"),
  },
  {
    source: require("../../src/TarotCards/assets/fool.png"),
  },
  {
    source: require("../../src/TarotCards/assets/hermit.png"),
  },
  {
    source: require("../../src/TarotCards/assets/high-priestess.png"),
  },
  {
    source: require("../../src/TarotCards/assets/judegment.png"),
  },
  {
    source: require("../../src/TarotCards/assets/justice.png"),
  },
  {
    source: require("../../src/TarotCards/assets/lover.png"),
  },
  {
    source: require("../../src/TarotCards/assets/moon.png"),
  },
  /*{
    source: require("../../src/TarotCards/assets/pendu.png"),
  },
  {
    source: require("../../src/TarotCards/assets/strength.png"),
  },
  {
    source: require("../../src/TarotCards/assets/sun.png"),
  },
  {
    source: require("../../src/TarotCards/assets/temperance.png"),
  },
  {
    source: require("../../src/TarotCards/assets/tower.png"),
  },
  {
    source: require("../../src/TarotCards/assets/wheel.png"),
  },
  {
    source: require("../../src/TarotCards/assets/world.png"),
  },*/
];

export const assets = cards.map((card) => card.source);

export const Tarot = () => {
  const shuffleBack = useSharedValue(false);
  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <Card card={card} key={index} index={index} shuffleBack={shuffleBack} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
});
