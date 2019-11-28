import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, SafeAreaView} from 'react-native';
import {Thumbnail, Body, Left, Card, CardItem, Badge} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';

class ChatList extends Component {
  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.props.chats}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                let idArray = [this.state.currentUser, item.id];
                idArray.sort();
                this.props.navigation.navigate('DetailChat', {
                  name: item._data.name,
                  roomId: idArray[0] + idArray[1],
                  current: this.state.currentUser,
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
      </SafeAreaView>
    );
  }
}
export default withNavigation(ChatList);

const styles = StyleSheet.create({
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
