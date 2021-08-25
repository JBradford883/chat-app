import React from 'react';

// Change font to Poppins
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

// Import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// Import react native gesture handler
import 'react-native-gesture-handler';

// Import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Create the navigator
const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Regular: Poppins_400Regular,
    Bold: Poppins_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

