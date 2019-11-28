import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {
  Header,
  Right,
  Left,
  Body,
  Container,
  Fab,
  Button,
  Card,
  CardItem,
  Thumbnail,
  Badge,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ChatList from '../../../componets/chats/ChatList';
import {ENTRIES1} from '../../../static/entries';
import {withNavigation} from 'react-navigation';

class index extends Component {
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
        {/* <ChatList chats={this.state.chats} /> */}
        <FlatList
          data={this.state.chats}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('DetailChat')}>
              <Card>
                <CardItem>
                  <Left>
                    <TouchableOpacity>
                      <Thumbnail blurRadius={0.5} source={{uri: item.avatar}} />
                    </TouchableOpacity>
                    <Body>
                      <Text style={{fontWeight: 'bold'}}>{item.username}</Text>
                      <Text numberOfLines={1}>
                        {item.message.last.length < 20
                          ? `${item.message.last}`
                          : `${item.message.last.substring(0, 32)}...`}
                      </Text>
                    </Body>
                  </Left>
                  <View style={style.bageView}>
                    <Text>{item.message.time}</Text>
                    <Badge style={style.badge} success>
                      <Text style={style.BadgeText}>{item.message.total}</Text>
                    </Badge>
                  </View>
                </CardItem>
              </Card>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />

        <Fab
          style={style.fab}
          onPress={() => this.props.navigation.navigate('UsersList')}>
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
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'white',
  },
  BadgeText: {
    color: 'white',
  },
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withNavigation(index);

const iconProps = {
  size: 25,
  color: 'white',
};
