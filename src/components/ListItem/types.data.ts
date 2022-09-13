import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { enumRoutes, RootStackParamList } from "../../routes/types.data";

export interface IListItemProps {
  title: string;
  routeName: enumRoutes;
}

export type EnumRoutes = enumRoutes;

export type ScreensNavigationsProps =
  NativeStackNavigationProp<RootStackParamList>;
