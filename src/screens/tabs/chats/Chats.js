import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Header, Right, Left, Body, Container, Fab, Button} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ChatList from '../../../componets/chats/ChatList';
import {ENTRIES1} from '../../../static/entries';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
    };
  }

  componentDidMount() {
    const chats = ENTRIES1;
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({chats});
  }
  render() {
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

const iconProps = {
  size: 25,
  color: 'white',
};
