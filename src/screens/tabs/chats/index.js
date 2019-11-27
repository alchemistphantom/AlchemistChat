import {createStackNavigator} from 'react-navigation-stack';
import Chats from './Chats';
// import DetailChat from './DetailChat';
export default createStackNavigator(
  {
    Chats,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);
