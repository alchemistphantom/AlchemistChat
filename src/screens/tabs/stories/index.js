import {createStackNavigator} from 'react-navigation-stack';
import Stories from './stories';
export default createStackNavigator(
  {
    Stories,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);
