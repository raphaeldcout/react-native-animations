import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "./types.data";

const RootStack = createNativeStackNavigator<RootStackParamList>();

import Components from "../index";
import Rotation from "../Rotation";
import { ReturnInitialPosition, KeepPositionOnScreen } from "../Swipe";
import ScrollView from "../ScrollView";
import { Tarot } from "../TarotCards";
import { Tinder } from "../Tinder";

const Routes = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Components"
        screenOptions={({ route, navigation }) => ({
          headerShown: true,
          gestureEnabled: true,
        })}
      >
        <RootStack.Screen
          name="Components"
          component={Components}
          options={{ title: "Animations" }}
        />
        <RootStack.Screen
          name="Rotation"
          component={Rotation}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="SwipeReturnOriginPosition"
          component={ReturnInitialPosition}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="SwipeKeepCurrentPosition"
          component={KeepPositionOnScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="ScrollView"
          component={ScrollView}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="TarotCards"
          component={Tarot}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Tinder"
          component={Tinder}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
