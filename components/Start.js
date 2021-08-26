import React from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';

// Sets the background image
const image = require('../assets/Background-Image.png');
const colors = ['#483D8B', '#5F9EA0', '#D2691E', '#3CB371', '#FFFFFF'];

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      backgroundColor: ''
    };
  }

  // Check for username
  onStartChatting = (username, backgroundColor) => {
    if (username == '') {
      return Alert.alert('Please enter a username');
    }
    this.props.navigation.navigate('Chat', {
      username: `${username}`,
      backgroundColor: `${backgroundColor}`,
    });
  }

  render() {
    const setColor = this.state.backgroundColor;
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

            <View style={styles.colorMenuWrapper}>
              <Text style={styles.colorMenuText}>Choose Chat Background Color</Text>

              {/* Component to change chat background color */}
              <View style={styles.colorMenu}>
                {colors.map((selectedColor) => (
                  <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Select Background Color"
                    accessibilityHint="Sets your chat screens background color."
                    accessibilityRole="button"

                    key={selectedColor}
                    style={[
                      styles.colorOptions(selectedColor),
                      setColor === selectedColor ? styles.border : null,
                    ]}
                    activeOpacity={0.5}
                    onPress={() => this.setState({ backgroundColor: selectedColor })}
                  />
                ))}
              </View>
            </View>

            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Start Chatting"
              accessibilityHint="Takes you to the chat screen."
              style={styles.button}
              title="Start Chatting"
              onPress={() => this.onStartChatting(this.state.username, this.state.backgroundColor)}>
              <Text style={styles.startChatting}>Start Chatting</Text>
            </TouchableOpacity>

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
    backgroundColor: 'rgba(245, 245, 245, 0.7)',
    borderWidth: 1,
    borderColor: '#2F4F4F',
    justifyContent: 'space-evenly',
    padding: 15,
    alignItems: 'center',
    flexDirection: 'column'
  },

  colorMenuWrapper: {
    alignItems: 'center',
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },

  titleWrapper: {
    flex: 0,
    justifyContent: 'space-evenly',
  },

  title: {
    fontSize: 50,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.65)',
    textShadowOffset: { width: .5, height: .5 },
    textShadowRadius: 3
  },

  inputField: {
    backgroundColor: '#fff',
    width: '95%',
    height: 50,
    borderColor: '#2F4F4F',
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    marginBottom: 30,
    fontFamily: 'Regular'
  },

  button: {
    backgroundColor: '#2F4F4F',
    height: 52,
    width: '95%',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },

  colorMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  colorOptions: (selectedColor) => ({
    backgroundColor: selectedColor,
    width: 40,
    height: 40,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 25,
  }),

  border: {
    borderWidth: 1,
    borderColor: '#FFD700',
  },

  colorMenuText: {
    color: '#2F4F4F',
    fontSize: 16,
    marginBottom: 15,
    fontFamily: 'Regular'
  },

  startChatting: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Bold'
  }

})