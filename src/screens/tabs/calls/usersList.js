import React, {Component} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {
  Container,
  Fab,
  Header,
  Text,
  Left,
  Right,
  View,
  Body,
  Card,
  CardItem,
  Thumbnail,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatList from '../../../componets/userList/UserList';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      count: 0,
    };
  }

  async componentDidMount() {
    const user = firebase.auth().currentUser;
    const id = user.uid;
    const unsubscribe = firestore()
      .collection('users')
      .get()
      .then(result => {
        let list = result.docs.filter(userInList => userInList.id !== user.uid);
        this.setState({
          userList: list,
          currentUser: user.uid,
          count: list.length,
        });
      });
  }
  render() {
    // Read the users documents
    return (
      <Container>
        <Header style={style.header}>
          <Body>
            <View style={style.iconHeader}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Chats')}>
                <Icon style={style.icon} {...iconProps} name="arrow-left" />
              </TouchableOpacity>
              <View>
                <Text style={style.textHeader}>Pilih Kontak </Text>
                <Text style={style.textSub}>{this.state.count} kontak</Text>
              </View>
            </View>
          </Body>
          <Right />
        </Header>
        <FlatList
          data={this.state.userList}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                let idArray = [this.state.currentUser, item.id];
                idArray.sort();
                this.props.navigation.navigate('DetailChat', {
                  name: item._data.username,
                  avatar: item._data.avatar,
                  roomId: idArray[0] + idArray[1],
                  currentUser: this.state.currentUser,
                });
              }}>
              <Card>
                <CardItem>
                  <Left>
                    <TouchableOpacity>
                      <Thumbnail
                        blurRadius={0.5}
                        source={{uri: item._data.avatar}}
                      />
                    </TouchableOpacity>
                    <Body>
                      <Text style={{fontWeight: 'bold'}}>
                        {item._data.username}
                      </Text>
                    </Body>
                  </Left>
                </CardItem>
              </Card>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </Container>
    );
  }
}

const style = StyleSheet.create({
  textHeader: {
    color: '#fff',
    fontSize: 17,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  textSub: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 22,
  },
  header: {
    backgroundColor: '#075E54',
  },
  fab: {
    backgroundColor: '#00CC3F',
  },
  iconHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
});
const iconProps = {
  size: 25,
  color: 'white',
};
