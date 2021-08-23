import React from 'react';
import { View, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { GiftedChat, Bubble, SystemMessage } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

  componentDidMount() {
    // Displays username in the navigation bar at the top of chat
    let username = this.props.route.params.username;
    this.props.navigation.setOptions({ title: username })

    // Displays user messages
    this.setState({
      messages: [
        // TestBot Message #2.
        {
          _id: 7,
          text: 'This react-native app is cool!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        // User Message #2.
        {
          _id: 6,
          text: 'How do you like the app?',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        // User Message #1.
        {
          _id: 5,
          text: 'Hello TestUser!',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://herasdev.com/img/f-01.jpg',
          },
        },
        // System Message #3: User chat entry message.
        {
          _id: 4,
          text: `${username} has entered the chat`,
          createdAt: new Date(),
          system: true,
        },
        // TestUser Message #1.
        {
          _id: 3,
          text: `Hello ${username}!`,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://herasdev.com/img/f-01.jpg',
          },
        },
        // System Message #2: TestUser chat entry message.
        {
          _id: 2,
          text: 'TestUser entered the chat',
          createdAt: new Date(),
          system: true,
        },
        // System Message #1: Welcome to the chat app.
        {
          _id: 1,
          text: 'Welcome to the chat app!.',
          createdAt: new Date(),
          system: true,
        },
      ],
    })
  }

  // Allows users to send a message
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  // Sets the System Message Color
  // renderSystemMessage(props) {
  //   let bgColor = this.props.route.params.bgColor;
  //   if (bgColor !== '#fff') {
  //     return (
  //       <SystemMessage
  //         {...props}
  //         textStyle={{ color: '#fff' }}
  //         timeTextStyle={{ color: '#fff' }}
  //       />
  //     )
  //   }
  // }

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

  render() {

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: this.props.route.params.bgColor }}>
        <View style={styles.chatArea}>
          <GiftedChat
            //renderSystemMessage={this.renderSystemMessage.bind(this)}
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          />
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