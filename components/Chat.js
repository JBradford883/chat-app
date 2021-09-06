import React from "react";

import { View, Platform, KeyboardAvoidingView, StyleSheet } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";

import NetInfo from '@react-native-community/netinfo';

const firebase = require("firebase");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBuzeSRAvL0GYjQRD6rc7_eXgnJoFP5i9s",
  authDomain: "chat-app-9d570.firebaseapp.com",
  projectId: "chat-app-9d570",
  storageBucket: "chat-app-9d570.appspot.com",
  messagingSenderId: "828501674686",
  appId: "1:828501674686:web:62866aa5ca34bdfef92cef",
  measurementId: "G-E4XC370SZ2"
};

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.referenceChatMessages = firebase.firestore().collection("messages");
    this.referenceMessageUser = null;

    this.state = {
      messages: [],
      uid: 0,
      loggedInText: "User Logging in...",
      user: {
        _id: "",
        name: "",
      },
      isConnected: false,
    };
  }

  async getMessages() {
    let messages = '';
    let uid = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      uid = await AsyncStorage.getItem('uid');

      this.setState({
        messages: JSON.parse(messages),
        uid: JSON.parse(uid),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: [],
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  addMessage() {
    const message = this.state.messages[0];
    // Adds the message to the collection
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: message.user,
    });
  }

  // Allows users to send a message
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
        this.saveMessages();
      }
    );
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
        },
      });
    });
    this.setState({
      messages,
    });
  };

  // Creates a customized bubble color
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        // Background color
        wrapperStyle={{
          right: {
            backgroundColor: '#4169E1'
          }
        }}
        textStyle={{
          right: {
            color: '#fff'
          }
        }}
      />
    )
  }

  // Hides toolbar when the user is offline
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return <InputToolbar {...props} />;
    }
  }

  componentDidMount() {
    const name = this.props.route.params.username;
    this.props.navigation.setOptions({ title: name });

    // Check to see if the user has internet access
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        // User is online
        console.log('online');
        this.setState({
          isConnected: true,
        });

        this.getMessages();
        this.renderInputToolbar();

        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            firebase.auth().signInAnonymously();
          }
          this.setState({
            uid: user.uid,
            messages: [],
            user: {
              _id: user.uid,
              name: name,
            },
          });
          this.referenceMessagesUser = firebase
            .firestore()
            .collection("messages")
            .where("uid", "==", this.state.uid);

          this.unsubscribe = this.referenceChatMessages
            .orderBy("createdAt", "desc")
            .onSnapshot(this.onCollectionUpdate);
        });
      } else {
        // User is offline
        console.log('offline');
        this.setState({
          isConnected: false,
        }),

          this.getMessages();
      }
    });
  }

  componentWillUnmount() {
    if (this.state.isConnected == false) {
    } else {
      // stop online authentication
      this.authUnsubscribe();
      this.unsubscribe();
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.route.params.backgroundColor, }}>
        <View style={styles.chatArea}>
          <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            renderInputToolbar={this.renderInputToolbar.bind(this)}
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            user={this.state.user}
          />
          {/* Fixes issues with Android Keyboard covering Chat window */}
          {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chatArea: {
    flex: 1,
    width: '100%'
  },

})