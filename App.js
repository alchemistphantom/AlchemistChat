import React, {Component} from 'react';
import {StatusBar, View, StyleSheet} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//import page
import {Container, Header, Left, Text, Right, Body} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Auth from './src/screens/Auth/';
import TabNav from './src/screens/tabs';
import DetailChat from './src/screens/tabs/chats/DetailChat';

const AppIndex = createAppContainer(Auth);
export default class App extends Component {
  componentDidUpdate() {
    StatusBar.setBarStyle('light-content', true),
      StatusBar.setBackgroundColor('#075E54');
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#075E54" barStyle="light-content" />
        {/* <Header style={style.header}>
          <Body>
            <Text style={style.textHeader}>AlchemistApp</Text>
          </Body>
          <Right>
            <View style={style.iconHeader}>
              <TouchableOpacity>
                <Icon style={style.icon} {...iconProps} name="magnify" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon {...iconProps} name="dots-vertical" />
              </TouchableOpacity>
            </View>
          </Right>
        </Header> */}
        <AppContainer />
      </View>
    );
  }
}

const DetailChats = createStackNavigator(
  {
    DetailChat: {screen: DetailChat},
  },
  {
    headerMode: 'none',
  },
);
const Tab = createStackNavigator(
  {
    TabNav: {screen: TabNav},
    DetailChat: {screen: DetailChats},
  },
  {
    initialRouteName: 'TabNav',
    headerMode: 'none',
  },
);

const StackNavigation = createSwitchNavigator(
  {
    Auth: {screen: Auth},
    Tab: {screen: Tab},
  },
  {
    initialRouteName: 'Auth',
    defaultNavigationOptions: {
      headerMode: 'none',
      headerStyle: {
        backgroundColor: '#075E54',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize: 15,
        alignItems: 'center',
      },
    },
  },
);
const AppContainer = createAppContainer(StackNavigation);
const style = StyleSheet.create({
  textHeader: {
    color: '#fff',
    fontSize: 20,
  },
  header: {
    backgroundColor: '#075E54',
  },
  iconHeader: {flexDirection: 'row'},
  icon: {
    marginRight: 20,
  },
});

const iconProps = {
  size: 25,
  color: 'white',
};
