import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import BrowserModal from "./BrowserModal";

const BrowserStack = createStackNavigator({ BrowserModal });

export default createAppContainer(
  createStackNavigator(
    {
      Main: MainTabNavigator,
      Browser: BrowserStack
    },
    {
      headerMode: "none",
      mode: "modal"
    }
  )
);
