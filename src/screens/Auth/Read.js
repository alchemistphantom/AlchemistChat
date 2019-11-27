import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
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
  Grid,
} from 'native-base';
import {TouchableOpacity, TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const ImageUri =
  'https://fsb.zobj.net/crop.php?r=Vz2o_onH1diB4RKRYs1KWjTDxvYQzV0I78o0KfE5wj6wFgzz6KPhO2e3LDGQdpZV9kvMjbQlZw-gjRf9snMpasW7GppYaYy3lNOqXYUaknfKZrSW6h89qcTFkYAzc2DI8Xf2ZTbQYyzABnxk';

export default class Read extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <Container>
        <ImageBackground
          source={{uri: ImageUri}}
          style={{width: '100%', height: '100%'}}>
          <Grid>
            <Row>
              <Col>
                <Body style={style.bg}>
                  <Text style={style.textTitle}>Welcome to AlchemistApp</Text>
                </Body>
              </Col>
            </Row>
            <Row size={4}>
              <Body style={style.bg}></Body>
            </Row>
            <Row>
              <Col>
                <Body style={style.bg}>
                  <Text style={style.bg}>
                    Read our Privacy Police and "Aggree and continue to accept
                    the Term of Service"
                  </Text>
                  <Button
                    style={style.button}
                    onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={style.buttonText}>AGREE AND CONTINUE</Text>
                  </Button>
                </Body>
              </Col>
            </Row>
          </Grid>
        </ImageBackground>
      </Container>
    );
  }
}
const style = StyleSheet.create({
  bg: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    color: 'white',
  },
  textTitle: {
    fontSize: 18,
    color: '#629C95',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#28D267',
    width: 285,
    justifyContent: 'center',
    color: 'white',
    margin: 20,
  },
  buttonText: {
    color: 'white',
  },
});
