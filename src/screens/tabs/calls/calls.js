import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Fab} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ChatList from '../../../componets/userList/UserList';
import {ENTRIES1} from '../../../static/entries';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import storage from '@react-native-firebase/storage';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
    };
  }

  async componentDidMount() {
    const unsubscribe = firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        this.setState({chats: querySnapshot.docs});
      });
  }
  render() {
    // Read the users documents
    return (
      <Container>
        <ChatList chats={this.state.chats} />
        {/* <Button
          onPress={() => {
            this.props.navigation.navigate('DetailChat');
          }}>
          <Text>Detail</Text>
        </Button> */}
        <Fab style={style.fab}>
          <Icon name="pencil" />
        </Fab>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  textHeader: {
    color: '#fff',
    fontSize: 14,
  },
  header: {
    backgroundColor: '#2980b9',
  },
  fab: {
    backgroundColor: '#00CC3F',
  },
});
