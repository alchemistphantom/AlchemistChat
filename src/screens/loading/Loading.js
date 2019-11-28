import {firebase} from '@react-native-firebase/auth';
import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;
    if (user) {
      // Signed in
      this.props.navigation.navigate('Tab');
    } else {
      // Signed out
    }
  }

  // Unsubscribe from further state changes

  render() {
    return (
      <View>
        <Text> Loading </Text>
      </View>
    );
  }
}
