import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Body,
  Right,
  Thumbnail,
  Left,
  Footer,
  Button,
  Row,
  Col,
  Item,
} from 'native-base';
import {TouchableOpacity, TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Navigation} from 'react-native-navigation';

export default class DetailChat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigate} = this.props.navigation;
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
                    uri:
                      'http://www.gstatic.com/tv/thumb/persons/589228/589228_v9_ba.jpg',
                  }}
                />
                <Text style={style.textHeader}>Mark </Text>
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
        </View>
        <Row style={style.footer}>
          <Col size={5}>
            <Item style={style.InputText}>
              <Row style={style.row}>
                <Col size={1}>
                  <Icon name="emoticon-outline" size={30} />
                </Col>
                <Col size={3}>
                  <TextInput placeholder="Ketik pesan" multiline={true} />
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
            <Button style={style.buttonSend}>
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
});

const iconProps = {
  size: 25,
  color: 'white',
};
