import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'native-base';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text> index Status </Text>
      </View>
    );
  }
}
index.navigationOptions = {
  tabBarLabel: 'STATUS',
  tabBarIcon: ({tintColor, focused}) => (
    <Icon
      name={focused ? 'comment-dots' : 'comment-dots'}
      color={tintColor}
      size={25}
    />
  ),
};
