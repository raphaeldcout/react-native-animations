import { ImageSourcePropType } from "react-native";
import {
  HandlerStateChangeEvent,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { SharedValue } from "react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper";

export interface IPicturesProps {
  finishedIntroAnimation: SharedValue<boolean>;
}

export interface IAttributesProps {
  source: ImageSourcePropType;
  name: string;
  price: string;
  textColor: string;
}

export interface IItemAttributesProps {
  item: IAttributesProps;

}

const pictures = [
  {
    source: require("../../src/NikeStore/assets/nike_1.png"),
    name: "Air Max Tailwind 4 Hyper",
    price: "R$ 500,00",
    textColor: "#575556",
  },
  {
    source: require("../../src/NikeStore/assets/nike_2.png"),
    name: "Air Max 90 White",
    price: "R$ 320,00",
    textColor: "#303030",
  },
  {
    source: require("../../src/NikeStore/assets/nike_3.png"),
    name: "Air Max 90 Ultra 2_0 Flyknit",
    price: "R$ 310,00",
    textColor: "#d75341",
  },
  {
    source: require("../../src/NikeStore/assets/nike_4.png"),
    name: "Air Max 270 White",
    price: "R$ 433,00",
    textColor: "#141819",
  },
  {
    source: require("../../src/NikeStore/assets/nike_5.png"),
    name: "Air Zoom Spiridon",
    price: "R$ 722,00",
    textColor: "#e67c8b",
  },
  {
    source: require("../../src/NikeStore/assets/nike_6.png"),
    name: "Air Max 97",
    price: "R$ 524,00",
    textColor: "#d4374c",
  },
  {
    source: require("../../src/NikeStore/assets/nike_7.png"),
    name: "Hyperdunk Low Purple",
    price: "R$ 224,00",
    textColor: "#48396e",
  },
  {
    source: require("../../src/NikeStore/assets/nike_8.png"),
    name: "Air Max 97 LX Pink",
    price: "R$ 400,00",
    textColor: "#1e1918",
  },
  {
    source: require("../../src/NikeStore/assets/nike_9.png"),
    name: "Nike X Off-White Air Max 97 OG Gray",
    price: "R$ 500,00",
    textColor: "#757575",
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

export const carrosels = assets.filter((picture, i) => {
  if (i === 0 || i === assets.length - 1) {
    return picture;
  }
});
