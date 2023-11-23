import * as React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import {Colors} from './src/theme/Colors';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ContactScreen from './src/screens/ContactScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="ContactScreen" component={ContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
