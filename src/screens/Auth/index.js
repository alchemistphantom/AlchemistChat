import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import Read from './Read';
import Login from './Login';
import InputOTP from './InputOTP';

const AuthStack = createStackNavigator({
  Read,
  Login,
  InputOTP,
});

export default AuthStack;
