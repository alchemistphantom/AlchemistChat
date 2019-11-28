/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {
  Header,
  Body,
  Right,
  Thumbnail,
  Button,
  Row,
  Col,
  Item,
  Card,
} from 'native-base';
import {TouchableOpacity, TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ENTRIES2} from '../../../static/entries';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';

export default class DetailChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      text: '',
    };
  }

  async componentDidMount() {
    const name = this.props.navigation.getParam('name', 'ChatRoom');
    this.props.navigation.setParams({name});

    const unsubscribe = firestore()
      .collection('message')
      .doc(this.props.navigation.getParam('roomId', ''))
      .collection('text')
      .orderBy('created', 'asc')
      .onSnapshot(querySnapshot => {
        this.setState({chats: querySnapshot.docs});
      });
  }

  onSendPress = async () => {
    console.log(this.state.text);
    const ref = firestore()
      .collection('message')
      .doc(this.props.navigation.getParam('roomId', ''))
      .collection('text');
    await ref.add({
      senderId: this.props.navigation.getParam('currentUser', ''),
      text: this.state.text,
      created: firestore.FieldValue.serverTimestamp(),
    });
    this.setState({text: ''});
  };

  render() {
    const {navigate} = this.props.navigation;
    const {text} = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 5}}>
          <Header style={style.header}>
            <Body>
              <View style={style.iconHeader}>
                <TouchableOpacity onPress={() => navigate('Chats')}>
                  <Icon style={style.icon} {...iconProps} name="arrow-left" />
                </TouchableOpacity>
                <Thumbnail
                  small
                  source={{
                    uri: this.props.navigation.getParam('avatar', 'DetailChat'),
                  }}
                />
                <Text style={style.textHeader}>
                  {this.props.navigation.getParam('name', 'DetailChat')}
                </Text>
              </View>
            </Body>

            <Right>
              <View style={style.iconHeader}>
                <TouchableOpacity>
                  <Icon style={style.icon} {...iconProps} name="webcam" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon style={style.icon} {...iconProps} name="phone" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon {...iconProps} name="dots-vertical" />
                </TouchableOpacity>
              </View>
            </Right>
          </Header>
          <FlatList
            data={this.state.chats}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              console.log(item);
              console.log(
                'yang login ' +
                  this.props.navigation.getParam('currentUser', ''),
              );
              console.log('yang kirim ' + item._data.senderId);
              if (
                item._data.senderId !==
                this.props.navigation.getParam('currentUser', '')
              ) {
                return (
                  <Card style={style.incomming}>
                    <Row>
                      <Text
                        style={{
                          padding: 15,
                        }}>
                        {item._data.text}
                        {this.props.navigation.getParam('currentId', '')}
                      </Text>
                    </Row>
                  </Card>
                );
              } else {
                return (
                  <View style={{alignItems: 'flex-end'}}>
                    <Card style={style.outSend}>
                      <Row>
                        <Text
                          style={{
                            padding: 15,
                          }}>
                          {item._data.text}
                        </Text>
                      </Row>
                    </Card>
                  </View>
                );
              }
            }}
            keyExtractor={item => item._data.created}
          />
        </View>
        <Row style={style.footer}>
          <Col size={5}>
            <Item style={style.InputText}>
              <Row style={style.row}>
                <Col size={1}>
                  <Icon name="emoticon-outline" size={30} />
                </Col>
                <Col size={3}>
                  <TextInput
                    placeholder="Ketik pesan"
                    onChangeText={value => this.setState({text: value})}
                    value={text}
                    multiline={true}
                  />
                </Col>
                <Col size={2}>
                  <Row style={style.row}>
                    <Col>
                      <Icon name="paperclip" size={30} />
                    </Col>
                    <Col>
                      <Icon name="camera" size={30} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Item>
          </Col>
          <Col size={1}>
            <Button style={style.buttonSend} onPress={() => this.onSendPress()}>
              <Icon size={20} color="white" name="send" />
            </Button>
          </Col>
        </Row>
      </View>
    );
  }
}
const style = StyleSheet.create({
  //   container: {
  //     backgroundColor: {},
  //   },
  buttonSend: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    borderRadius: 125,
    backgroundColor: '#075E54',
  },
  footer: {
    height: 50,
    flexDirection: 'row',
    marginBottom: 5,
  },
  InputText: {
    marginHorizontal: 5,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 0,
    borderRadius: 25,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textHeader: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
  },
  header: {
    backgroundColor: '#075E54',
  },
  iconHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  icon: {
    marginRight: 20,
  },
  row: {
    alignItems: 'center',
  },
  incomming: {
    height: 'auto',
    width: 305,
    margin: 10,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  outSend: {
    height: 'auto',
    width: 305,
    backgroundColor: '#E1FFC7',
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
});

const iconProps = {
  size: 25,
  color: 'white',
};
