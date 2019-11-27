/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  createMaterialTopTabNavigator,
  createAppContainer,
} from 'react-navigation-tabs';

//page import

import chats from './chats';
import Detail from './chats/DetailChat';
import stories from './stories/';
import calls from './calls';

const AppNavigator = createMaterialTopTabNavigator(
  {
    Home: chats,
    Profile: stories,
    Settings: calls,
  },
  {
    navigationOptions: {
      swipeEnabled: true,
    },
    tabBarOptions: {
      activeTintColor: 'white',
      showIcon: false,
      showLabel: true,
      bounces: true,
      style: {
        backgroundColor: '#075E54',
      },
    },
  },
);
export default AppNavigator;
