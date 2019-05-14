import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home"
};

const LinksStack = createStackNavigator({
  Links: LinksScreen
});

LinksStack.navigationOptions = {
  tabBarLabel: "Just In"
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Politics"
};

export default createMaterialTopTabNavigator(
  {
    HomeStack,
    LinksStack,
    SettingsStack
  },
  {
    tabBarOptions: {
      activeTintColor: "#FFFFFF",
      inactiveTintColor: "#DDDDDD",
      labelStyle: {
        fontSize: 10,
        margin: 0
      },
      style: {
        backgroundColor: "#333333",
        height: 30
      }
    }
  }
);
