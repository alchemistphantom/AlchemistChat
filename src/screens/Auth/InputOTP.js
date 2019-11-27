import React, {Component} from 'react';
import {Text, StyleSheet, Image} from 'react-native';
import {
  Container,
  Body,
  Footer,
  Button,
  Row,
  Col,
  Item,
  Grid,
  Spinner,
} from 'native-base';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

// import firebase from 'react-native-firebase';

export default class InputOTP extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      selected: 'choose',
      user: null,
      message: '',
      username: '',
      email: '',
      password: '',
      isLoading: false,
    };
  }
  static navigationOptions = {
    header: null,
  };
  handleLogin = () => {
    this.setState({isLoading: true});
    const {email, password} = this.state;

    if (email === '' || password === '') {
      console.log('kosong');
      this.setState({message: 'Lengkapi semua kolom!', isLoading: false});
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Chats'))
        .catch(error =>
          this.setState({message: error.message, isLoading: false}),
        );
    }
  };

  renderMessage() {
    const {message} = this.state;
    if (!message.length) {
      return null;
    }
    return <Text style={{padding: 5, color: '#c0392b'}}>{message}</Text>;
  }

  renderLoading() {
    const {isLoading} = this.state;
    console.log(this.state.email);
    return <Spinner hidesWhenStopped={isLoading} />;
  }

  render() {
    const {email, password, isLoading} = this.state;
    console.log(email);
    return (
      <Container style={style.container}>
        <Grid>
          <Row style={{height: 50}}>
            <Col>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image
                  style={style.imgIcon}
                  source={require('../../assets/images/close.png')}
                />
              </TouchableOpacity>
            </Col>
          </Row>
          <Row style={{height: 70}}>
            <Col>
              <Body>
                <Text style={style.bg}>Masuk Dengan Email</Text>
              </Body>
            </Col>
          </Row>
          <Row size={4}>
            <Col style={style.col}>
              <Body>
                <Item style={style.textInput}>
                  <Text style={style.country}>Email</Text>
                  <TextInput
                    ref={input => {
                      this.secondTextInput = input;
                    }}
                    keyboardType="email-address"
                    maxLength={50}
                    textContentType="emailAddress"
                    placeholder="Masukan Email"
                    onChangeText={value => this.setState({email: value})}
                    value={email}
                  />
                </Item>
                <Item style={style.textInput}>
                  <Text style={style.country}>Sandi</Text>
                  <TextInput
                    ref={input => {
                      this.secondTextInput = input;
                    }}
                    secureTextEntry
                    keyboardType="default"
                    maxLength={50}
                    textContentType="telephoneNumber"
                    placeholder="Masukan Sandi"
                    onChangeText={value => this.setState({password: value})}
                    value={password}
                  />
                </Item>

                <Button
                  style={style.button}
                  onPress={() => {
                    this.handleLogin();
                  }}>
                  <Text style={style.buttonText}>Masuk</Text>
                </Button>
                {isLoading ? this.renderLoading() : this.renderMessage()}
              </Body>
            </Col>
          </Row>
        </Grid>
        <TouchableOpacity>
          <Footer style={style.footer}>
            <Text style={style.buttonText}>Sudah punya akun? Login</Text>
          </Footer>
        </TouchableOpacity>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  imgIcon: {
    margin: 10,
    height: 25,
    width: 25,
  },
  textHeader: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#075E54',
    alignItems: 'center',
  },
  bg: {
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 25,
  },
  col: {
    marginTop: 30,
  },
  textTitle: {
    fontSize: 18,
    color: '#629C95',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
  },
  button: {
    backgroundColor: '#28D267',
    width: 300,
    justifyContent: 'center',
    color: 'white',
    margin: 20,
  },
  username: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#28D267',
    marginLeft: 10,
    width: 300,
  },
  textInput2: {
    borderBottomWidth: 1,
    borderBottomColor: '#28D267',
    marginLeft: 10,
    width: 260,
  },
  country: {
    marginRight: 20,
  },
  profile: {
    backgroundColor: '#DDDDDD',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: '#0BA454',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
