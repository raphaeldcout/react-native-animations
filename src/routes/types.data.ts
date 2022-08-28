enum Routes {
  Components,
  Rotation,
  SwipeReturnOriginPosition,
  SwipeKeepCurrentPosition,
  ScrollView,
  TarotCards,
  Tinder,
}

export type enumRoutes = keyof typeof Routes;

export type RootStackParamList = { [key in enumRoutes]: undefined };
