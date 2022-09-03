import { ImageSourcePropType } from "react-native";
import {
  HandlerStateChangeEvent,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { SharedValue } from "react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper";

export interface IPicturesProps {
  picture: IAttributesProps;
  index?: number;
  svgX: SharedValue<number>;
  svgY: SharedValue<number>;
  onSingleTapEvent: (
    event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>,
    imgsLength: number
  ) => void;
  tapTransitionX: SharedValue<number>;
  tapTransitionXImg: SharedValue<number>;
}

export interface IAttributesProps {
  source: ImageSourcePropType[];
  name: string;
  age: string;
  distance: string;
  active: boolean;
}

const pictures = [
  {
    source: [
      require("../../src/Tinder/assets/gabriela-1.jpeg"),
      require("../../src/Tinder/assets/gabriela-2.jpeg"),
      require("../../src/Tinder/assets/gabriela-3.jpeg"),
    ],
    name: "Gabriela",
    age: "30",
    distance: "543 kilometers away",
    active: true,
  },
  {
    source: [
      require("../../src/Tinder/assets/david-1.jpeg"),
      require("../../src/Tinder/assets/david-2.jpeg"),
    ],
    name: "David",
    age: "32",
    distance: "43 kilometers away",
    active: false,
  },
  {
    source: [
      require("../../src/Tinder/assets/alex-1.jpg"),
      require("../../src/Tinder/assets/alex-2.jpg"),
      require("../../src/Tinder/assets/alex-3.jpg"),
    ],
    name: "Alex Lukas",
    age: "31",
    distance: "13 kilometers away",
    active: false,
  },
  /*{
    source: [
      require("../../src/Tinder/assets/lily7.jpg"),
      require("../../src/Tinder/assets/5.jpg"),
      require("../../src/Tinder/assets/lily6.jpg"),
    ],
    name: "Lily Collins",
    age: "33",
    distance: "3 kilometers away",
    active: false,
  },*/
  {
    source: [
      require("../../src/Tinder/assets/gustavo-1.jpg"),
      require("../../src/Tinder/assets/gustavo-2.jpg"),
    ],
    name: "Gustavo",
    age: "22",
    distance: "17 kilometers away",
    active: true,
  },
  {
    source: [
      require("../../src/Tinder/assets/giovana-1.jpg"),
      require("../../src/Tinder/assets/giovana-2.jpg"),
      require("../../src/Tinder/assets/giovana-3.jpg"),
      require("../../src/Tinder/assets/giovana-4.jpg"),
    ],
    name: "Giovana",
    age: "24",
    distance: "4 kilometers away",
    active: false,
  },
];

export const assets = pictures
  .map((picture) => ({
    value: picture.source,
    sort: Math.random(),
    ...picture,
  }))
  .sort((a, b) => a.sort - b.sort)
  .map((picture) => picture);
