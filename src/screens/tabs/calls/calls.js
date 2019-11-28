import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'native-base';
import {firebase} from '@react-native-firebase/auth';

export default class calls extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout = async () => {
    await firebase.auth().currentUser.signOut();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View>
        <Button onPress={() => this.logout()}>
          <Text> Logout </Text>
        </Button>
      </View>
    );
  }
}
