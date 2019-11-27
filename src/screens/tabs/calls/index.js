import {createStackNavigator} from 'react-navigation-stack';
import calls from './calls';
export default createStackNavigator(
  {
    calls,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);
