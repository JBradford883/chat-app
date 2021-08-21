import React from 'react';
import { View, Text } from 'react-native';

export default class Chat extends React.Component {

  render() {
    let name = this.props.route.params.username;
    // Displays username in the navigation bar at the top of chat 
    this.props.navigation.setOptions({ title: name });

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: this.props.route.params.bgColor }}>
        <Text style={{ color: 'gray', fontWeight: 'bold' }}>Welcome</Text>
      </View>
    );
  }
}