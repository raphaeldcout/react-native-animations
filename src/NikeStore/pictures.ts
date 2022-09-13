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
  price: string;
}

const pictures = [
  {
    source: [require("../../src/NikeStore/assets/nike_1.png")],
    name: "Nike _Tênis Air Max Tailwind 4 __Hyper Pink_Illusion Green",
    price: "R$ 500,00",
  },
  {
    source: [require("../../src/NikeStore/assets/nike_2.png")],
    name: "Nike Tênis Air Max 90 - Branco",
    price: "R$ 320,00",
  },
  {
    source: [require("../../src/NikeStore/assets/nike_3.png")],
    name: "Nike Tênis 'Air Max 90 Ultra 2_0 Flyknit' - Cinza",
    price: "R$ 310,00",
  },
  {
    source: [require("../../src/NikeStore/assets/nike_4.png")],
    name: "Nike Tênis Air Max 270 - Branco",
    price: "R$ 433,00",
  },
  {
    source: [require("../../src/NikeStore/assets/nike_5.png")],
    name: "Nike Tênis 'Air Zoom Spiridon' em couro - Branco",
    price: "R$ 722,00",
  },
  {
    source: [require("../../src/NikeStore/assets/nike_6.png")],
    name: "Nike Tênis cano baixo Air Max 97 - Branco",
    price: "R$ 524,00",
  },
  {
    source: [require("../../src/NikeStore/assets/nike_7.png")],
    name: "Nike Tênis Hyperdunk Low - Roxo",
    price: "R$ 224,00",
  },
  {
    source: [require("../../src/NikeStore/assets/nike_8.png")],
    name: "Nike Tênis Nike Air Max 97 LX - Rosa",
    price: "R$ 400,00",
  },
  {
    source: [require("../../src/NikeStore/assets/nike_9.png")],
    name: "Nike X Off-White Tênis The 10_ Air Max 97 OG - Cinza",
    price: "R$ 500,00",
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
