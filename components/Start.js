import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

// Sets the background image
const image = require('../assets/Background-Image.png');

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      bgColor: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>

        {/* Background image for the home page */}
        <ImageBackground source={image} style={styles.image}>

          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Chat App</Text>
          </View>

          {/* View component for user name input */}
          <View style={styles.inputWrapper}>
            <TextInput style={styles.inputField}
              onChangeText={(username) => this.setState({ username })}
              value={this.state.username}
              placeholder='Enter your Name'
            />

            {/* View component wrapper to change chat background color */}
            <View style={styles.bgWrapper}>

              <Text style={styles.colorMenuText}>Choose Background Color</Text>

              <View style={styles.colorMenu}>
                <TouchableOpacity
                  style={[styles.selectBgColor, { backgroundColor: '#ffffff' }]}
                  onPress={() => this.setState({ bgColor: '#ffffff' })}
                />
                <TouchableOpacity
                  style={[styles.selectBgColor, { backgroundColor: '#008b8b' }]}
                  onPress={() => this.setState({ bgColor: '#008b8b' })}
                />
                <TouchableOpacity
                  style={[styles.selectBgColor, { backgroundColor: '#6495ed' }]}
                  onPress={() => this.setState({ bgColor: '#6495ed' })}
                />
                <TouchableOpacity
                  style={[styles.selectBgColor, { backgroundColor: '#8fbc8f' }]}
                  onPress={() => this.setState({ bgColor: '#8fbc8f' })}
                />
                <TouchableOpacity
                  style={[styles.selectBgColor, { backgroundColor: '#4b0082' }]}
                  onPress={() => this.setState({ bgColor: '#4b0082' })}
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                title="Start Chatting"
                onPress={() =>
                  this.props.navigation.navigate('Chat', { username: this.state.username, bgColor: this.state.bgColor })
                }>
                <Text style={styles.startChatting}>Start Chatting</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center'
  },

  inputWrapper: {
    flex: 0,
    width: '88%',
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
    padding: 15,
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },

  titleWrapper: {
    flex: 0.5,
    justifyContent: 'space-evenly',
  },

  title: {
    fontSize: 50,
    fontWeight: '600',
    color: '#fff'
  },

  inputField: {
    backgroundColor: '#fff',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    marginBottom: 10
  },

  button: {
    backgroundColor: '#476380',
    height: 52,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },

  colorMenu: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 15,
  },

  colorMenuText: {
    color: '#757083',
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 5
  },

  selectBgColor: {
    width: 50,
    height: 50,
    marginRight: 5,
    borderWidth: 2,
    borderRadius: 25
  },

  startChatting: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }

})