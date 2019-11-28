import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  Container,
  Body,
  Footer,
  Button,
  Row,
  Col,
  Item,
  Grid,
} from 'native-base';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import storage from '@react-native-firebase/storage';

export default class Login extends Component {
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
      avatar: 'https://i.imgur.com/UYiroysl.jpg',
    };
  }

  chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, response => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        console.log('User tapped custom button: ', response.customButton);
        const source = {uri: response.uri};
        // console.log(response.uri);

        // You can also display the image using data:
        // const source = {uri: 'data:image/jpeg;base64,' + response.data};
        console.log(source);
        // alert(JSON.stringify(response));s
        // console.log('response', JSON.stringify(response));
        this.setState({
          avatar: response.uri,
        });
      }
    });
  };

  static navigationOptions = {
    header: null,
  };
  signUp = async () => {
    const {username, email, password, avatar} = this.state;
    if (username === '' || email === '' || password === '') {
      console.log('kosong');
      this.setState({
        message: '*Lengkapi semua kolom!',
        isLoading: false,
      });
    } else {
      try {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            const idToken = auth().currentUser.uid;
            firestore()
              .collection('users')
              .doc(idToken)
              .set({
                id: idToken,
                username: username,
                email: email,
                password: password,
                avatar: avatar,
              })
              .then(() => this.props.navigation.navigate('Chats'))
              .catch(error => this.setState({message: error.message}));
            this.props.navigation.navigate('Chats');
          })
          .catch(error => this.setState({message: error.message}));
      } catch (e) {
        console.error('jghgchgc ' + e.message);
      }
    }
  };

  renderFileData() {
    if (this.state.avatar) {
      this.getSelectedImages(this.state.avatar);
      return (
        <Image
          source={{
            uri: this.state.avatar,
          }}
          style={style.images}
        />
      );
    }
  }

  renderMessage() {
    const {message} = this.state;
    if (!message.length) {
      return null;
    }
    return <Text style={{padding: 5, color: '#c0392b'}}>{message}</Text>;
  }

  getSelectedImages = async currentImage => {
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;

    let uploadBlob = null;
    const imageRef = storage()
      .ref('posts/jery')
      .child('test.jpg');
    let mime = 'image/jpg';
    fs.readFile(currentImage, 'BASE64')
      .then(data => {
        return Blob.build(data, {type: `${mime};BASE64`});
      })
      .then(blob => {
        uploadBlob = blob;
        return imageRef.put(currentImage, {contentType: mime});
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then(url => {
        // URL of the image uploaded on Firebase storage
        console.log(' urll ' + url);
      });
    // .catch(error => {
    //   console.log(' urll5555 ' + error.message);
    // });
  };

  render() {
    // this.addUser('jery');
    const {username, email, password} = this.state;
    console.log(this.state.message);
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
                <Text style={style.bg}>Sign up dengan email</Text>
              </Body>
            </Col>
          </Row>
          <Row size={4}>
            <Col style={style.col}>
              <Body>
                <View style={style.username}>
                  <Item style={style.textInput2}>
                    <Text style={style.country}>Nama</Text>
                    <TextInput
                      ref={input => {
                        this.secondTextInput = input;
                      }}
                      keyboardType="default"
                      maxLength={20}
                      textContentType="username"
                      placeholder="Jery Lenas"
                      onChangeText={value => this.setState({username: value})}
                      value={username}
                    />
                  </Item>
                  <TouchableOpacity onPress={() => this.chooseImage()}>
                    <View style={style.profile}>
                      {!this.state.avatar ? (
                        <Icon name="camera-outline" size={20} />
                      ) : (
                        <Image
                          source={this.state.avatar}
                          style={style.images}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
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
                {this.renderMessage()}
                <Button
                  style={style.button}
                  onPress={() => {
                    this.signUp();
                  }}>
                  <Text style={style.buttonText}>Sign up</Text>
                </Button>
              </Body>
            </Col>
          </Row>
        </Grid>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('InputOTP')}>
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
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: '#0BA454',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 50,
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

// onSubmitEditing = {() => {
//   this.secondTextInput.focus();
// }}
